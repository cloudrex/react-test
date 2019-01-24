import Component from "./component";

export type Renderer<T> = (state: T) => void;

export default abstract class Core {
    protected static rootElement: Element;
    protected static rootComponent: Component;

    public static mount(component: Component, selector: string = "#root"): void {
        const el = document.querySelector(selector);

        if (el === null) {
            throw new Error("Specified selector does not match any existing element");
        }

        this.rootElement = el;
        this.rootComponent = component;
    }
}
