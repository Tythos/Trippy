/**
 * @author <code@tythos.net>
 */

import qudom from "./qudom/index.js";
import Workbench from "./Workbench/index.js";

function main() {
    window.document.body.appendChild(qudom("div.Header!Some Stuff"));
}

window.addEventListener("load", main);
