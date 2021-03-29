const router = require('express').Router();
const errors = require('../helpers/errors');
const axios = require('axios');

router.get('/videodata',
    errors.wrap(async (req, res, next) => {
        const videoData = await axios.get(`https://${process.env.DATASOURCE_URL}`);
        if (!videoData) throw new errors.NotFound('Requested URL not found');
        res.send(200);
    }));

module.exports = router;