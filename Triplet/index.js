/**
 * 
 */

import Handlebars from "../handlebars.js/handlebars.esm.js";

class Trip {
    constructor(importMetaUrl) {
        this.fields = {};
        this.listeners = {};
        this.bindings = {};
        this.cssPath = importMetaUrl.replace(/\.js$/, ".css");
        this.hbsPath = importMetaUrl.replace(/\.js$/, ".hbs");
        this.subdom = null;
    }

    assertSingularCss() {
        let head = window.document.head;
        let cssi = Array.from(head.querySelectorAll("link"));
        for (let i = 0; i < cssi.length; i++) {
            let css = cssi[i];
            if (css.getAttribute("href") == this.cssPath) {
                return;
            }
        }
        let link = window.document.createElement("link");
        link.setAttribute("href", this.cssPath);
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        window.document.head.appendChild(link);
    }

    bind(selector, tag) {
        if (!this.bindings.hasOwnProperty(selector)) {
            this.bindings[selector] = [];
        }
        this.bindings[selector].push(tag);
    }

    set(field, value) {
        this.fields[field] = value;
        return this;
    }

    on(tag, listener) {
        if (!this.listeners.hasOwnProperty(tag)) {
            this.listeners[tag] = [];
        }
        this.listeners[tag].push(listener);
        return this;
    }

    fire(tag, event) {
        if (!this.listeners.hasOwnProperty(tag)) {
            this.listeners[tag] = [];
        }
        this.listeners[tag].forEach(function(listener) {
            listener(event);
        });
    }

    append(parent=null, onSuccess=null) {
        if (parent == null) {
            parent = window.document.body;
        }
        this.assertSingularCss();
        fetch(this.hbsPath)
            .then(response => response.text())
            .then(text => {
                this.subdom = window.document.createElement("div");
                this.subdom.innerHTML = Handlebars.compile(text)(this.fields);
                Object.keys(this.bindings).forEach(selector => {
                    let tag = this.bindings[selector];
                    this.subdom.querySelector(selector).addEventListener(tag, event => {
                        this.fire(tag, event);
                    });
                });
                parent.appendChild(this.subdom);
                if (onSuccess !== null) {
                    onSuccess(this);
                }
            });
        return this;
    }
}

export default Object.assign(Trip, {
    "__url__": "",
    "__semver__": "",
    "__license__": "",
    "__tests__": [],
    "__deps__": {}
});
