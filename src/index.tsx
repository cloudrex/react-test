import Core from "./core";
import $App from "./testComponents/app";
import jsdom from "jsdom";

export const doc: Document = new jsdom.JSDOM("<body><div id='root'></div></body>")
    .window.document;

Core.mount(new $App());
