const jwt = require('jsonwebtoken');
const token = jwt.sign({ data: 'test' }, process.env.AUTH_KEY, { expiresIn: '1h' });

module.exports = (req, res, next) => {
    const userToken = req.header('authorization') && req.header('authorization').split(" ")[1];
    try {
        jwt.verify(userToken, process.env.AUTH_KEY);
        next();
    } catch (err) {
        console.error(err);
        res.status(403).json({ err });
    }
}