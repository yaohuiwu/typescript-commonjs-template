import { sum } from "./calc.js";

function printMessage(msg: string): void {
    console.log(`Message: ${ msg }`);
}

printMessage("Hello, Typescript");
// tslint:disable-next-line no-debugger
debugger;

const total = sum(100, 200, 300);
console.log(`Total: ${total}`);
