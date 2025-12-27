import {createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    // Заполняем выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                          const option = document.createElement('option');
                          option.value = name;
                          option.textContent = name;
                          return option;
                      })
        )
     })

    // Настраиваем компаратор
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

        // Отфильтровываем данные используя компаратор
        return data.filter(row => compare(row, filterState));
    }
}