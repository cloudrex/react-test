import Component, {XComponent} from "../component";

interface IState {
    readonly name: string;
    readonly age: number;
}

export default class $App extends Component<IState> {
    protected state: IState = {
        name: "john doe",
        age: 0
    };

    public componentDidMount() {
        setTimeout(() => {
            this.update({
                age: Date.now()
            });
        }, 3000);
    }

    public render(): XComponent {
        console.log("Rendering ..");

        return (
            <string name="john">
                <nest>
                    {this.state.name}
                </nest>
            </string>
        );
    }

    public increment(): this {
        this.update({
            age: this.state.age + 1
        });

        return this;
    }
}
