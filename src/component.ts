import {Renderer} from "./core";

export default abstract class Component<TProps extends object = any, TState extends object = any> {
    protected readonly props: TProps;

    protected renderer?: Renderer<TState>;
    protected state: TState;

    public constructor(props?: TProps) {
        this.props = props || {} as TProps;
        this.state = {} as TState;
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

    public abstract render(): Component;

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
}
