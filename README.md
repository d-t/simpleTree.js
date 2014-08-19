# simpleTree.js
===============

simpleTree.js allows to draw a tree on a canvas element within a HTML page.

## Aknowledgments
The original idea and part of the code belongs to [Kenneth Jørgensen](http://kennethjorgensen.com/blog/) and his amazing [Canvas Trees](http://kennethjorgensen.com/blog/2014/canvas-trees/).

## How to use simpleTree.js
1. Import jQuery and simpleTree.js in the HTML file.
2. Add a `canvas` element to `<body>`.
3. Add an `id` attribute to the `canvas` element.
  * E.g. `<canvas id="simple-tree"></canvas>`.
4. Create the tree by calling the function `simpleTree`, including the following arguments:
  * Canvas element id, e.g. `"simple-tree"`;
  * Number of main tree branches, e.g. `3`;
  * Number of branches each branch has to be split, e.g. `3`;
  * Canvas background color, e.g. `"#000000"`;
  * Tree stroke color, e.g. `"rgba(255, 255, 255, 0.5)"`.
You can open the file `simple-tree.html` and see how to use simpleTree.js