/**
 * @author <code@tythos.net>
 */

import handlebars from "../handlebars.js/dist/handlebars.es6.js";

const TEMPLATE = handlebars.compile(`<div class="{{myclass}}"/>`);

function graft(parent, template, params) {
    let div = window.document.createElement("div");
    div.innerHTML = template(params);
    Array.from(div.children).forEach(ch => parent.appendChild(ch));
}

/**
 * Instantiating a workbench provides UI-driven controls over window layout.
 * This is defined by a tree of UI windows that can either be populated; split
 * L/R (horizontally); or split T/B (vertically). These splits are resizable
 * and each individual window comes with four controls:
 * 
 * * Select/change window contents, from a known set of models
 * 
 * * Replace with L/R split
 * 
 * * Replace with T/B split
 * 
 * * Close (opposing window will merge into joint space)
 * 
 * The "Workbench" instance actually handles 
 */
class Workbench {
    constructor(parent=window.document.body) {
        graft(parent, TEMPLATE, {
            "myclass": "MyClass"
        });
    }
}

export default Object.assign(Workbench, {
    "__url__": "",
    "__license__": "",
    "__semver__": "",
    "__deps__": {},
    "__tests__": []
});
