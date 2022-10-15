/**
 * @author <code@tythos.net>
 */

function factory(shorthand) {
    let pattern = /[!$.#]/g;
    let parts = shorthand.split(pattern);
    let symbols = shorthand.match(pattern);
    console.assert(parts.length === symbols.length + 1);
    let element = window.document.createElement(parts.splice(0, 1));
    for (let i = 0; i < symbols.length; i += 1) {
        switch (symbols[i]) {
            case "!":
                element.textContent = parts[i];
                break;
            case "$":
                let style = parts[i].split("=");
                element.style.setProperty(style[0], style[1]);
                break;
            case ".":
                element.classList.add(parts[i]);
                break;
            case "#":
                element.id = parts[i];
                break;
            default:
                console.error(`Unreachable state reached`);
        }
    }
    return element;
}

function main() {
    window.document.body.appendChild(factory("div.Header!Some Stuff"));
}

window.addEventListener("load", main);
