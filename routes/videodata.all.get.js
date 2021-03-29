const router = require('express').Router();
const errors = require('../helpers/errors');
const paginator = require('../helpers/paginator');
const axios = require('axios');

router.post('/videodata',
    errors.wrap(async (req, res, next) => {
        const page_params  = req.body.pagination;
        const videoData = await axios.get(`https://${process.env.DATASOURCE_URL}`);
        if (!videoData) throw new errors.NotFound('Requested URL not found');
        res.send(paginator(videoData.data, page_params));
    }));

module.exports = router;