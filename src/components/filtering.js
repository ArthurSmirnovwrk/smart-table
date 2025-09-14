import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison([
	'skipEmptyTargetValues',
	'caseInsensitiveStringIncludes',
	'skipNonExistentSourceFields',
	'failOnEmptySource',
	'arrayAsRange',
	'stringIncludes',
	'exactEquality'
]);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
		if (elements[elementName]) {
			const options = Object.values(indexes[elementName]).map(name => {
				const option = document.createElement('option');
				option.value = name;
				option.textContent = name;
				return option;
			});

			const emptyOption = document.createElement('option');
			emptyOption.value = '';
			emptyOption.textContent = 'Все';
			elements[elementName].append(emptyOption, ...options);
		}
	});

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
			const fieldName = action.dataset.field;
			const parent = action.closest('.filter-group');

			if (parent) {
				const input = parent.querySelector('input, select');
				if (input) {
					input.value = '';
					state[fieldName] = '';
				}
			}
		}

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}