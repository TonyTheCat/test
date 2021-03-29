const wrap = (fn) => (...args) => fn(...args).catch(args[args.length - 1]);

const handleError = (err, res) => {
    const {statusCode, message} = err;
    console.error('Error: ', message);
    res.status(statusCode || 500).json({message});
};

const errorTypes = {
    InvalidInput: 400,
    NotFound: 404,
    UnprocessableEntity: 422,
    InternalServer: 500,
}

for (const className in errorTypes) {
    module.exports[className] = ({[className] : class extends Error {
        constructor(message) {
            super();
            this.statusCode = errorTypes[className];
            this.message = message;
        }
    }})[className]
}

module.exports = {
    ...module.exports,
    wrap,
    handleError,
}
