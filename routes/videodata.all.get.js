const router = require('express').Router();
const errors = require('../helpers/errors');
const { validate, body } = require('../helpers/validator');
const paginator = require('../helpers/paginator');
const filter = require('../helpers/filter');
const sorter = require('../helpers/sorter');
const axios = require('axios');

router.post('/videodata',
    validate([
        body('filter').optional().isString(),
        body('pagination').optional().isObject().custom(value => {
            return value.page && value.per_page;
        }),
        body('sorting').optional().isObject().custom(value => {
            return value.by && value.type;
        })
    ]),
    errors.wrap(async (req, res, next) => {
        const page_params = req.body.pagination;
        const filter_params = req.body.filter;
        const sort_params = req.body.sorting;

        const videoData = await axios.get(`https://${process.env.DATASOURCE_URL}`);

        if (!videoData) throw new errors.NotFound('Requested URL not found');

        let data = videoData.data;
        data = filter(data, filter_params);
        data = sorter(data, sort_params);
        data = paginator(data, page_params);
        res.send(data);
    }));

module.exports = router;