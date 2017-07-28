exports.catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status
    };
    res.status(err.status || 500);
    return res.json({
        success: false,
        errorDetails
    });
};

exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        success: false,
        message: 'Whoops! Something went wrong...',
        error: {}
    });
};