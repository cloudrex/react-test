import Component, {IElement, Tag} from "./component";
import {doc} from ".";

export type Renderer<T> = (state: T) => void;

export default abstract class ReactTest {
    protected static root: Element;

    public static test(): void {
        const c: Component = null as any;
    }

    /**
     * Initialize the root element.
     */
    public static init(rootId: string): void {
        ReactTest.root = doc.querySelector(`#${rootId}`)!;
    }

    /**
     * Resolve the absolute tag. If the tag is a
     * component, the 'div' tag will be returned,
     * otherwise the corresponding tag will be returned.
     */
    public static resolveTag(tag: Tag): string {
        return typeof tag === "function" ? "div" : tag;
    }

    /**
     * Recursively convert a custom element to an HTML element.
     */
    public static convert(elm: IElement): HTMLElement {
        // TODO: Debugging.
        console.log(elm);

        // Create the HTML element. Resolve the tag.
        const htmlElm: HTMLElement = doc.createElement(ReactTest.resolveTag(elm.tag));

        // Assign the id.
        htmlElm.id = elm.id;

        for (const child of elm.content) {
            // Normal inner text child.
            if (typeof child === "string") {
                htmlElm.textContent += child;
            }
            // Child element node.
            else if (typeof child === "object") {
                htmlElm.innerHTML += ReactTest.convert(child).outerHTML;
            }
            else {
                throw new Error("Invalid child type");
            }
        }

        return htmlElm;
    }

    // TODO: Here, we would implement a Virtual DOM. Then, we'd determine whether the component should be (re-mounted) if the state changed, or always mount on first state.
    /**
     * Mount a custom element onto the DOM.
     */
    public static mount(elm: IElement): void {
        if (elm === null) {
            throw new Error("Specified selector does not match any existing element");
        }

        // Invoke the component's will mount event.
        // elm.componentWillMount();


        const converted: HTMLElement = ReactTest.convert(elm);

        console.log("Converted element's test prop:", converted.outerHTML);

        // Mount the element.
        ReactTest.root.appendChild(converted);

        // Invoke the component's did mount event.
        // elm.componentDidMount();
    }
}
