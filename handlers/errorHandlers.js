exports.catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || '';
    res.status(err.status || 500);
    err.message = 'Whoops! Something went wrong...';
    return res.json({ error: err });
};

exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500);
    err.message = 'Whoops! Something went wrong...';
    return res.json({ error: err });
};