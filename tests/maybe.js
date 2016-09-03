"use strict"
const assert = require('chai').assert
const Maybe = require('../index').Maybe

describe('Maybe', () => {
    it("should return value for just", () => {
        assert.strictEqual(3, Maybe.maybe(Maybe.of(3), null))
        assert.strictEqual(3, Maybe.of(3).maybe(null))
        assert.strictEqual(3, Maybe.maybe(Maybe.just(3), null))
    })

    it("simple_chain", () => {
        const c = Maybe.of(3)
            .chain(function (x) {
                return Maybe.of(x * 2)
            })

        assert.deepEqual(
            Maybe.maybe(c, null),
            6)
    })

    it('chain_order', () => {
        const c = Maybe.of(1)
            .chain(function (x) {
                return Maybe.of(x + 1)
            })
            .chain(function (x) {
                return Maybe.of(x * 2)
            })

        assert.deepEqual(
            Maybe.maybe(c, null),
            4)
    })

    it("chain_nothing", () => {
        const c = Maybe.of(1)
            .chain(function (x) {
                return Maybe.nothing
            })
            .chain(function (x) {
                return Maybe.of(x * 2)
            })
            .chain(function (x) {
                return Maybe.of(x + 10)
            })

        assert.strictEqual('def', Maybe.maybe(c, 'def'))
    })

    it("map_right", () => {
        const c = Maybe.of(3)
            .map(x => x * 2)
            .chain(function (x) {
                return Maybe.of(x / 3)
            })

        assert.strictEqual(2, Maybe.maybe(c, 'def'))
    })

    it("should return nothing for map nothing", () => {
        const c = Maybe.nothing
            .map(x => x * 2)
            .chain(function (x) {
                return Maybe.of(x / 3)
            })

        assert.strictEqual('def', Maybe.maybe(c, 'def'))
    })

    it("should not invoke map or chain functions for nothing", () => {
        var g =0;
        const c = Maybe.nothing
            .map(x => { g++ })
            .chain(x => { g++ })

        assert.strictEqual('def', Maybe.maybe(c, 'def'))
        assert.strictEqual(g, 0);
    })
})
