import Component, {IElement} from "../component";

interface IProps {
    readonly name: string;
    readonly age: number;
}

export default class $HelloWorld extends Component<IProps> {
    protected state: IProps = {
        name: "john doe",
        age: 0
    };

    public render(): IElement {
        return (
            <string>hello world</string>
        );
    }

    public increment(): this {
        this.update({
            age: this.state.age + 1
        });

        return this;
    }
}
