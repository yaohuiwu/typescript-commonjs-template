import { sum } from "./calc.js";

function printMessage(msg: string): void {
    console.log(`Message: ${ msg }`);
}

printMessage("Hello, Typescript");

let total = sum(100, 200, 300);
console.log(`Total: ${total}`);
