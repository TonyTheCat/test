const router = require('express').Router();
const errors = require('../helpers/errors');
const paginator = require('../helpers/paginator');
const filter = require('../helpers/filter');
const axios = require('axios');

router.post('/videodata',
    errors.wrap(async (req, res, next) => {
        const page_params = req.body.pagination;
        const filter_params = req.body.filter;
        const videoData = await axios.get(`https://${process.env.DATASOURCE_URL}`);

        if (!videoData) throw new errors.NotFound('Requested URL not found');

        let data = videoData.data;
        data = filter(data, filter_params);
        data = paginator(data, page_params);
        res.send(data);
    }));

module.exports = router;