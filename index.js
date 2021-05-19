(function () {
    const parser = new DOMParser();
    
    const sub = Symbol("internal");
    const set = Symbol("internal");

    class State {
        #v;
        #subs;

        constructor(v) {
            this.#v = v;
            this.#subs = [];
        }

        toString() {
            return this.#v.toString();
        }

        valueOf() {
            return this.#v;
        }

        [Symbol.toPrimitive]() {
            return this.#v;
        }

        __sub__(v, key) {
            if (key !== sub)
                throw new Error(
                    "oi ur not allowed to call State.prototype.__sub__ >:C"
                );

            this.#subs.push(v);

            return this.#subs;
        }

        __set__(v, key) {
            if (key !== sub)
                throw new Error(
                    "oi ur not allowed to call State.prototype.__set__ >:C"
                );

            const old = this.#v;

            this.#v = v;

            this.#subs.forEach((cb) => cb(old, this.#v));

            return this.#v;
        }
    }

    class Component {
        #frozen;
        #el;
        #html;
        #vals;

        constructor(el, html, vals) {
            this.#frozen = false;
            this.#el = el;
            this.#html = html;
            this.#vals = vals;
            
            [...this.#vals.entries()].forEach(([k, v]) => {
                v.__sub__((o, n) => {
                    if (!this.isFrozen) this.render();
                }, sub);
            });
        }

        get isFrozen() {
            return this.#frozen;
        }
    
        get rendered() {
            return this.#el.innerHTML;
        }

        freeze() {
            this.#frozen = true;

            return this;
        }

        unfreeze() {
            this.#frozen = false;

            return this;
        }

        render() {
            this.#el.innerHTML = "";
            
            this.#el.append(...parser.parseFromString([...this.#vals.entries()].reduce(
                (t, [k, v]) =>
                    t.replace(
                        new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`, `g`),
                        v.valueOf()
                    ),
                this.#html
            ), "text/html").body.childNodes);

            return this;
        }
    }

    function render(el, html, states) {
        if (!(el instanceof HTMLElement))
            throw new Error("lol the element needs to be an html element");

        if (typeof html !== "string")
            throw new Error("lmao theres no html to template");

        const deps = [
            ...new Set(
                Array.from(
                    html.match(/\{\{\s*([$a-zA-Z_][$a-zA-Z0-9_]*)\s*\}\}/g) ??
                        []
                ).map((m) => m.slice(2, -2).trim())
            )
        ];

        const vals = new Map();

        if (states)
            deps.forEach((dep) => {
                if (!(dep in states))
                    throw new Error(`bruh the state ${dep} doesnt exist lol`);

                vals.set(dep, states[dep]);
            });

        const component = new Component(el, html, vals).render();

        return component;
    }

    function useState(v) {
        const state = new State(v);

        return [state, (v) => void state.__set__(v, sub)];
    }

    globalThis.Templates = { render, useState };
})();

/* It works! */

const { render, useState } = Templates;

const [counter, setCounter] = useState(0);

render(
    document.getElementById("test"),
    `<button onclick="setCounter(counter + 1)">Clicked {{ counter }} times!</button>`,
    { counter }
);
