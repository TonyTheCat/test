const e = require('express');
const { body, param, query, validationResult } = require('express-validator')
const err = require('./errors')
const validate = validations => {
    return err.wrap(async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) return next();
        const errMessages = errors.array()
            .map(e => {       
                const errorPlace = e.value === 'object'
                ? JSON.stringify(e.value)
                : e.value;
            return `${e.msg} ${e.param} in ${e.location} - ${JSON.stringify(errorPlace)}`;
        })

        throw new err.UnprocessableEntity(errMessages.join());
    });
};

module.exports = {
    validate,
    body,
    param,
    query,
}