import Core from "./core";
import {EventEmitter} from "events";
import Util from "./util";
import shortid from "shortid";

export interface IComponent {
    rerender(): this;
    render(): XComponent;
}

export type XComponent = any;

/**
 * Represents an element tag string.
 */
export type Tag = string;

/**
 * The possible content of an element.
 */
export type ElementContent = Array<string | IElement>;

export interface IElement {
    /**
     * A unique string used to identify this specific
     * element.
     */
    readonly id: ShortId;

    /**
     * The element's tag string.
     */
    readonly tag: Tag;

    /**
     * The element's attributes.
     */
    readonly attr: any;

    /**
     * The element's content.
     */
    readonly content: ElementContent;
}

/**
 * Unique id string.
 */
export type ShortId = string;

export default abstract class Component<TState = any, TChild = any> extends EventEmitter implements IComponent {
    protected static readonly elements: Map<ShortId, IElement> = new Map();

    public static create(tag: string, attributes: any, ...content: ElementContent): IElement {
        // Custom component.
        if (Util.isUppercase(tag[0])) {
            throw new Error("Support for custom components is not yet implemented");
        }

        // Otherwise, it's an HTML element.
        const id: ShortId = shortid.generate();

        const elm: IElement = {
            id,
            attr: attributes,
            content,
            tag
        };

        Component.elements.set(id, elm);

        return elm;
    }

    public readonly child: TChild;

    protected state: TState;
    protected timeouts: number[] = [];

    public constructor() {
        super();

        this.state = {} as TState;
        this.child = {} as TChild;
    }

    public rerender(): this {
        Core.rerender(this);

        return this;
    }

    public abstract render(): XComponent;

    protected update(state: Partial<TState>): this {
        this.state = {
            ...this.state,
            ...state
        };

        this.rerender();

        return this;
    }

    public componentWillMount(): void {
        //
    }

    public componentDidMount(): void {
        //
    }

    public componentWillUpdate(): void {
        //
    }

    public componentDidUpdate(): void {
        //
    }
}
