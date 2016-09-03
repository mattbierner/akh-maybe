"use strict"
const MaybeT = require('./trans/maybe');
const Maybe = require('./type/maybe');

module.exports = {
    MaybeT: MaybeT,
    Maybe: Maybe,

    trans: { maybe: MaybeT },
    type: { maybe: Maybe }
};
