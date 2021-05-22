declare class State<V> {
    #private;
    constructor(v: V);
    toString(): any;
    valueOf(): V;
    [Symbol.toPrimitive](): V;
    __sub__(v: (n: V, o: V) => unknown | Promise<unknown>, key: symbol): ((n: V, o: V) => unknown)[];
    __set__(v: V, key: symbol): V;
}
declare class Component {
    #private;
    constructor(el: HTMLElement, html: string, vals: Map<string, State<unknown>>);
    get isFrozen(): boolean;
    get rendered(): string;
    freeze(): this;
    unfreeze(): this;
    render(): this;
}
declare function render(el: HTMLElement, html: string, states: {
    [state: string]: State<unknown>;
}): Component;
declare function useState<V>(v: V): (State<V> | ((v: V) => undefined))[];
declare const _default: {
    render: typeof render;
    useState: typeof useState;
};
export default _default;
