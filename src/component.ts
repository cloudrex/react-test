import {Renderer} from "./core";
import {EventEmitter} from "events";

export interface IComponent<TState = any> {
    setRenderer(renderer: Renderer<TState>): this;
    invokeRenderer(): this;
    render(): XComponent;
}

export type XComponent = any;

export default abstract class Component<TState = any, TChild = any> extends EventEmitter implements IComponent {
    public static create(tag: string, attributes: any, content: any): void {
        console.log("Create element", tag, attributes, typeof content);
    }

    public readonly child: TChild;

    protected renderer?: Renderer<TState>;
    protected state: TState;

    public constructor() {
        super();

        this.state = {} as TState;
        this.child = {} as TChild;
    }

    public setRenderer(renderer: Renderer<TState>): this {
        this.renderer = renderer;

        return this;
    }

    public invokeRenderer(): this {
        if (this.renderer === undefined) {
            throw new Error("Unexpected renderer to be undefined");
        }

        this.renderer(this.state);

        return this;
    }

    public abstract render(): XComponent;

    protected update(state: Partial<TState>): this {
        this.state = {
            ...this.state,
            ...state
        };

        this.invokeRenderer();

        return this;
    }

    protected componentWillMount(): void {
        //
    }

    protected componentDidMount(): void {
        //
    }

    protected componentWillUpdate(): void {
        //
    }

    protected componentDidUpdate(): void {
        //
    }
}
