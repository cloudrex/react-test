export default class UI {
    public static create(tag: string, attributes: any, content: any): void {
        console.log("Create element", tag, attributes, typeof content);
    }
}
