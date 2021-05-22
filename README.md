| [a](https://www.npmjs.com/package/@cursorsdottsx/a)
| [b](https://www.npmjs.com/package/@cursorsdottsx/b)
| [c](https://www.npmjs.com/package/@cursorsdottsx/c)
| [d](https://www.npmjs.com/package/@cursorsdottsx/d)
| [e](https://www.npmjs.com/package/@cursorsdottsx/e)
| [f](https://www.npmjs.com/package/@cursorsdottsx/f)
| [g](https://www.npmjs.com/package/@cursorsdottsx/g)
| [h](https://www.npmjs.com/package/@cursorsdottsx/h)
| [i](https://www.npmjs.com/package/@cursorsdottsx/i)
| [j](https://www.npmjs.com/package/@cursorsdottsx/j)
| [k](https://www.npmjs.com/package/@cursorsdottsx/k)
| [l](https://www.npmjs.com/package/@cursorsdottsx/l)
| [m](https://www.npmjs.com/package/@cursorsdottsx/m)
| [n](https://www.npmjs.com/package/@cursorsdottsx/n)
| [o](https://www.npmjs.com/package/@cursorsdottsx/o)
| [p](https://www.npmjs.com/package/@cursorsdottsx/p)
| [q](https://www.npmjs.com/package/@cursorsdottsx/q)
| [r](https://www.npmjs.com/package/@cursorsdottsx/r)
| [s](https://www.npmjs.com/package/@cursorsdottsx/s)
| **t**
| [u](https://www.npmjs.com/package/@cursorsdottsx/u)
| [v](https://www.npmjs.com/package/@cursorsdottsx/v)
| [w](https://www.npmjs.com/package/@cursorsdottsx/w)
| [x](https://www.npmjs.com/package/@cursorsdottsx/x)
| [y](https://www.npmjs.com/package/@cursorsdottsx/y)
| [z](https://www.npmjs.com/package/@cursorsdottsx/z)
|

**T is for Templates**

# @cursorsdottsx/t

Ok, what's another templating library doing? Well thanks for asking.
This one is a templating library that is stateful and totally does not copy React. Totally. 100%.

```js
const { render, useState } = Templates;

const [counter, setCounter] = useState(0);

render(document.getElementById("test"), `<button onclick="setCounter(counter + 1)">Clicked {{ counter }} times!</button>`, { counter });
```

Well to be fair the templating part is Vue-ish, and what's more is that this library is under 150 lines!

#### Usage

Import the library however you wish, then use the `Templates` object like in the example.

```js
const Templates = require("@cursorsdottsx/t");
```

```js
import Templates from "@cursorsdottsx/t";
```

**WARNING: THIS LIBRARY DOES NOT PREVENT XSS IM TOO LAZY TO DO THAT**

[npm abc's homepage](https://codepen.io/cursorsdottsx/full/KKWNRaY)
