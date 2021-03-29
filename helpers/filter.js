module.exports = function filter(data, filter) {
    return filter ? data.filter(el => el.content.location.some(el => el == filter)) : data;
}