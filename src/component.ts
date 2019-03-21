import ReactTest from "./core";
import {EventEmitter} from "events";
import Util from "./util";
import shortid from "shortid";
import {Action} from "./helpers";

export interface IComponent {
    rerender(): this;
    render(): XComponent;
}

export type XComponent = any;

/**
 * Represents an element tag.
 */
export type Tag = string | Action;

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

export default abstract class Component<TProps extends {} = {}, TState extends {} = {}> extends EventEmitter implements IComponent {
    protected static readonly elements: Map<ShortId, IElement> = new Map();

    public static create(tag: Tag, attributes: any, ...content: ElementContent): IElement {
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

    protected state: TState;
    protected props: TProps;
    protected timeouts: number[] = [];

    public constructor(props: TProps) {
        super();

        this.state = {} as any;
        this.props = props;
    }

    public rerender(): this {
        ReactTest.rerender(this);

        return this;
    }

    public abstract render(): XComponent;

    protected update(state: Partial<TProps>): this {
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
