/**
 * @author <code@tythos.net>
 */

import qudom from "./qudom/index.js";
import Workbench from "./Workbench/index.js";

function main() {
    window.document.body.appendChild(qudom("div.Header!Some Stuff"));
    new Workbench(window.document.body);
}

window.addEventListener("load", main);
