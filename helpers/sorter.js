module.exports = function sorter(data, sort_params) {
    return sort_params ? data.sort((a, b) => {
        if (sort_params.type == "acs") {
            return a[sort_params.by] - b[sort_params.by]
        } else if (sort_params.type == "desc") {
            return b[sort_params.by] - a[sort_params.by]
        }
    }) : data;
}