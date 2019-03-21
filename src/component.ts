import ReactTest from "./reactTest";
import {EventEmitter} from "events";
import shortid from "shortid";
import {Action} from "./helpers";

export interface IComponent<TProps, TState> {
    mount(): void;
    render(): IElement;

    /**
     * Invoked before the component is mounted onto the DOM.
     */
    componentWillMount?(): void;

    /**
     * Invoked after the component is mounted onto the DOM.
     */
    componentDidMount?(): void;

    /**
     * Invoked before a state update occurs.
     */
    componentWillUpdate?(): void;

    /**
     * Invoked after a state update occurs.
     */
    componentDidUpdate?(): void;
}

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

export type Ref<T extends HTMLElement> = T;

// TODO: Use IComponentProps as TProps extends (IComponentProps & {}), to allow merging of key=, ref=, etc. and custom props.
/**
 * Internal props used by the Component class.
 */
export interface IComponentProps {
    readonly key?: string | number;
    readonly ref?: Ref<any>;
}

export default abstract class Component<TProps extends {} = {}, TState extends {} = {}> extends EventEmitter implements IComponent<TProps, TState> {
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

    /**
     * Mount (or re-mount) this element onto the DOM.
     */
    public mount(): void {
        ReactTest.mount(this.render());
    }

    public abstract render(): IElement;

    /**
     * Update the local state of this element.
     */
    protected update(state: Partial<TProps>): this {
        this.state = {
            ...this.state,
            ...state
        };

        // Mount the component if applicable.
        this.mount();

        return this;
    }
}
