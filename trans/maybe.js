"use strict"
const spec = require('akh.core.spec')
const EitherT = require('akh.either').EitherT

/**
 * Maybe monad transformer.
 * 
 * @param m Base monad.
 */
const MaybeT = m => {
    const Instance = EitherT(m)
    const left = Instance.left
    const right = Instance.right

    delete Instance.left
    delete Instance.prototype.left

    delete Instance.right
    delete Instance.prototype.right

    Instance.just = Instance.prototype.just = right
    Instance.nothing = Instance.prototype.nothing = left(null)
    
    Instance.prototype.run = function() {
        return MaybeT.run(this)
    }

    return Instance
}

/**
 * Perform an Maybe computation with mapping functions.
 * 
 * @param m MaybeT computation.
 * @param ok Success completion function that maps left value to inner monad.
 * @param err Failure completion function that maps right value to inner monad.
 */
MaybeT.run = (m) =>
    EitherT.run(m).map(r =>
        r.right
            ?{ just: true, value: r.value }
            :{ nothing: true })

module.exports = MaybeT
