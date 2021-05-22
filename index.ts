const parser = new DOMParser();

const sub = Symbol("internal");
const set = Symbol("internal");

class State<V> {
    #v: V;
    #subs: ((n: V, o: V) => unknown | Promise<unknown>)[];

    constructor(v: V) {
        //@ts-ignore
        this.#v = v;
        this.#subs = [];
    }

    toString() {
        //@ts-ignore
        return this.#v.toString();
    }

    valueOf() {
        return this.#v;
    }

    [Symbol.toPrimitive]() {
        return this.#v;
    }

    __sub__(v: (n: V, o: V) => unknown | Promise<unknown>, key: symbol) {
        if (key !== sub) throw new Error("oi ur not allowed to call State.prototype.__sub__ >:C");

        this.#subs.push(v);

        return this.#subs;
    }

    __set__(v: V, key: symbol) {
        if (key !== set) throw new Error("oi ur not allowed to call State.prototype.__set__ >:C");

        const old = this.#v;

        this.#v = v;

        this.#subs.forEach((cb) => cb(old, this.#v));

        return this.#v;
    }
}

class Component {
    #frozen: boolean;
    #el: HTMLElement;
    #html: string;
    #vals: Map<string, State<unknown>>;

    constructor(el: HTMLElement, html: string, vals: Map<string, State<unknown>>) {
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

        this.#el.append(
            ...Array.from(
                parser.parseFromString(
                    //@ts-ignore
                    [...this.#vals.entries()].reduce((t, [k, v]) => t.replace(new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`, `g`), v.valueOf()), this.#html),
                    "text/html"
                ).body.childNodes
            )
        );

        return this;
    }
}

function render(el: HTMLElement, html: string, states: { [state: string]: State<unknown> }) {
    if (!(el instanceof HTMLElement)) throw new Error("lol the element needs to be an html element");

    if (typeof html !== "string") throw new Error("lmao theres no html to template");

    const deps = [...new Set(Array.from(html.match(/\{\{\s*([$a-zA-Z_][$a-zA-Z0-9_]*)\s*\}\}/g) ?? []).map((m) => m.slice(2, -2).trim()))];

    const vals = new Map();

    if (states)
        deps.forEach((dep) => {
            if (!(dep in states)) throw new Error(`bruh the state ${dep} doesnt exist lol`);

            vals.set(dep, states[dep]);
        });

    const component = new Component(el, html, vals).render();

    return component;
}

function useState<V>(v: V) {
    const state = new State<V>(v);

    return [state, (v: V) => void state.__set__(v, sub)];
}

export default {
    render,
    useState,
};
