import {createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    Object.keys(indexes)
      .forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                      .map(name => {
                          const option = document.createElement('option');
                          option.value = name;
                          option.textContent = name;
                          return option;
                      })
        )
     })

    const compare = createComparison(defaultRules);

    return (data, state, action) => {
        const filterState = {...state};
        if (filterState.totalFrom || filterState.totalTo) {
            filterState.total = [
                filterState.totalFrom ? parseFloat(filterState.totalFrom) : '',
                filterState.totalTo ? parseFloat(filterState.totalTo) : ''
            ];
        }
        delete filterState.totalFrom;
        delete filterState.totalTo;

        return data.filter(row => compare(row, filterState));
    }
}