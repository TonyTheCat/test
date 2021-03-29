function paginator(items, page_params) {
    const page = page_params && page_params.page || 1;
    const per_page = page_params && page_params.per_page || 5;
    const offset = (page - 1) * per_page;

    const paginatedItems = items.slice(offset).slice(0, per_page);
    const total_pages = Math.ceil(items.length / per_page);
    
    return {
        page,
        total_pages: total_pages,
        total_items: items.length,
        data: paginatedItems
    };
}

module.exports = paginator;