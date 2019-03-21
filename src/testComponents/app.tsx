import Component, {XComponent} from "../component";
import $HelloWorld from "./helloWorld";

interface IProps {
    readonly name: string;
    readonly age: number;
}

export default class $App extends Component<IProps> {
    protected state: IProps = {
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
            <$HelloWorld name="john" age={100} />
        );
    }

    public increment(): this {
        this.update({
            age: this.state.age + 1
        });

        return this;
    }
}
