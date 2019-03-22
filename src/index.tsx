import ReactTest from "./reactTest";
import $App from "./testComponents/app";
import jsdom from "jsdom";
import Component from "./component";

export const win: jsdom.DOMWindow = new jsdom.JSDOM("<body><div id='root'></div></body>").window;
export const doc: Document = win.document;

ReactTest.init("root");
ReactTest.mount(<$App key="e" age={100} name="doe"><str>This is a value</str></$App>);
