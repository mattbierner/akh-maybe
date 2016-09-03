# Maybe Monad and Monad Transformer for [Akh Javascript Monad Library](https://github.com/mattbierner/akh)

The MaybeT transformer, `MaybeT`, adds error control to a monad. The base type, `Maybe`, provides error logic on its own.

```bash
# To use as standalone package
$ npm install --save akh.maybe

# To use as part of akh library
$ npm install --save akh
```

## Usage
`MaybeT` and `Maybe` implement the [Fantasy Land][fl] monad, functor, and applicative functor interfaces.

<a href="https://github.com/fantasyland/fantasy-land">
    <img src="https://raw.github.com/fantasyland/fantasy-land/master/logo.png" align="right" width="82px" height="82px" alt="Fantasy Land logo" />
</a>

```js
// Maybe monad
require('akh.maybe').Maybe
require('akh').Maybe

// Maybe monad transformer
require('akh.maybe').MaybeT
require('akh').MaybeT
```

#### `Maybe.run(m)`, `m.run()`
Perform a error computation `m` and return a maybe object result

```js
Maybe.run(Maybe.just(3).map(x => -x)) === { just: true, value: -3 }
Maybe.run(Maybe.nothing.map(x => -x)) === { nothing: true }
```

#### `MaybeT.run(t)`, `t.run()`
Same as `Maybe.run` but for a monad transformer. Returns an `Maybe` value inside of the inner monad.


#### `Maybe.maybe(m, def)`, `m.maybe(def)`
Perform an maybe computation `m` and return the result if it succeeds and `def` if it fails.


## Maybe Interface

#### `Maybe.just(x)`
#### `MaybeT(m).just(x)`
Same as `Maybe.of`. Success value.

#### `Maybe.nothing`
#### `MaybeT(m).nothing`
Error value


## Contributing
Contributions are welcome.

To get started:

```bash
$ cd akh-maybe
$ npm install # install dev packages
$ npm test # run tests
```

[fl]: https://github.com/fantasyland/fantasy-land

