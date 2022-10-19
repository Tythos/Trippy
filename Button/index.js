/**
 * 
 */

import Triplet from "../Triplet/index.js";

class Button extends Triplet {
    constructor() {
        super(import.meta.url);
        this.bind("button", "click");
    }
}

export default Object.assign(Button, {
    "__url__": "",
    "__license__": "",
    "__semver__": "",
    "__deps__": {},
    "__tests__": []
});
