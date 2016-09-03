"use strict"
const Identity = require('akh.identity').Identity
const MaybeT = require('../trans/Maybe')

/**
 * Maybe monad
 */
const Maybe = MaybeT(Identity)

/**
 * Extract result from Maybe monad.
 * 
 * @param m Maybe.
 * 
 * Returns an object `{ just: true/false, value: optional result if just }`
 */
Maybe.run = (m) =>
    Identity.run(MaybeT.run(m))

Maybe.prototype.run = function() {
    return Maybe.run(this)
}

/**
 * Extract value from Maybe monad or return def
 * 
 * @param m Maybe.
 * @param def Default value
 */
Maybe.maybe = (m, def) => {
    const r = Maybe.run(m)
    return r.just ? r.value : def
}

Maybe.prototype.maybe = function(def) {
    return Maybe.maybe(this, def)
}

module.exports = Maybe
