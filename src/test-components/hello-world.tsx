import Component, {XComponent} from "../component";

interface IState {
    readonly name: string;
    readonly age: number;
}

export default class $HelloWorld extends Component<IState> {
    protected state: IState = {
        name: "john doe",
        age: 0
    };

    public render(): XComponent {
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


class TestUpperCaseComp {
    public constructor(arg: any) {
        console.log("Constructed with args: ", arg);
    }
}
