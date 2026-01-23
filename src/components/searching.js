export function initSearching(searchField) {
    return (query, state, _action) => {
        return state[searchField] ? Object.assign({}, query, {
            search: state[searchField]
        }) : query;
    }
}