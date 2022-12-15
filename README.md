# trippy

Boilerplate for forking minimal webapps. Largely intended as a not-quite-dropin replacement for React without the build, abstraction, or other overhead. Reusable "component"-like elements ("triplets") are defined by at least three resources:

* A .CSS file that is asserted for attachment once

* A .HBS file that defines the HTML DOM template to be rendered

* A .JS file that exports a Triplet subclass and handles object modeling for the element

The only dependency is a gist-based fork of Handlebars, cloned via submodule for ESM compatibility.

The "top level" of a Triplet app is similar, but with some significant differences:

* An .HTML file defines the browser "entry point"

* This references a top-level .CSS file from the head of the DOM

* An "index.js" file is referenced as a "module" script that defines the "logical" entry point for the app

From the top-level "index.js" file, specific Triplets can be imported for instantiation within the app DOM.

The "Triplet" class itself (defined in "./Triplet/index.js") contains most of the "magic". By exporting a superclass, using import.meta.url as the constructor parameter, it provides elements with the following behaviors:

* Assertion of singular .CSS attachment, based on a ".cssPath" property that defaults to "index.css"

* "set"-like behavior for defining the values of specific template variables before the Handlebars content is rendered

* "render"-like behavior for defining the mechanism by which the Handlebars template is translated into DOM, including event listener subscriptions, and eventually attached to some parent node. (By default, this is the document body.)

Events are supported by two specific methods:

1. "bind(selector, tag)" is called by the subclass constructor to define specific events to which other listeners can subscribe. The first parameter is a CSS-style selector used to identify specific nodes within the rendered DOM. The second parameter is an arbitrary string tag used to identify the event that is generated for later subscription.

1. "on(tag, listener)" is used to subscribe to specific events. These events are identified by the string tag used in subclass constructor "bind()" calls (see above).

1. Finally, a "fire()" method manages the publish behavior of specific events when a tag is activated.
