/**
 * @author <code@tythos.net>
 */

import qudom from "./qudom/index.js";
import Workbench from "./Workbench/index.js";
import Button from "./Button/index.js";

function main() {
    window.document.body.appendChild(qudom("div.Header!Some Stuff"));
    new Workbench(window.document.body, console.log)
    let b = new Button()
        .set("label", "My Button")
        .on("click", console.log)
        .append();
}

window.addEventListener("load", main);
