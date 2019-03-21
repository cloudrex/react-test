import Component from "./component";
import {doc} from ".";

export type Renderer<T> = (state: T) => void;

export default abstract class Core {
    protected static rootElement: Element;
    protected static rootComponent: Component;

    public static mount(component: Component, selector: string = "#root"): void {
        const elm = doc.querySelector(selector);

        if (elm === null) {
            throw new Error("Specified selector does not match any existing element");
        }

        // Invoke the component's will mount event.
        component.componentWillMount();

        this.rootElement = elm;
        this.rootComponent = component;

        // Invoke the component's did mount event.
        component.componentDidMount();
    }

    public static rerender(component: Component): void {
        console.log(component.render());
    }
}
