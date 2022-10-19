/**
 * @author <code@tythos.net>
 */

import handlebars from "../handlebars.js/handlebars.esm.js";

const HBSPATH = import.meta.url.replace(/\.js$/, ".hbs");
const CSSPATH = import.meta.url.replace(/\.js$/, ".css");

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
 * The "Workbench" instance actually handles a node level recursively.
 */
class Workbench {
    constructor(parent=null, onSuccess=null) {
        if (parent === null) {
            parent = window.document.body;
        }
        this.subdom = window.document.createElement("div");
        this.stylesheet = (href => {
            let head = window.document.head;
            let linki = head.querySelectorAll("link");
            for (let i = 0; i < linki.length; i++) {
                let link = linki[i];
                if (link.href === href) {
                    return link;
                }
            }
            let link = window.document.createElement("link");
            link.href = href;
            link.rel = "stylesheet";
            link.type = "text/css";
            head.appendChild(link);
            return link;
        })(CSSPATH);
        parent.appendChild(this.subdom);
        fetch(HBSPATH)
            .then(response => response.text())
            .then(text => handlebars.compile(text))
            .then(generator => {
                this.subdom.innerHTML = generator({
                    "myclass": "MyClass"
                });
                if (onSuccess !== null) {
                    onSuccess(this);
                }
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
