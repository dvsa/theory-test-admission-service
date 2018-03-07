import coreFilters from './core_filters';
import customFilters from './filters';

// Require core and custom filters, merges to one object
// and then add the methods to Nunjucks environment
export const addNunjucksFilters = (env) => {
	const core = coreFilters(env);
	const custom = customFilters(env);
	const filters = Object.assign(core, custom);
	Object.keys(filters).forEach((filterName) => {
		env.addFilter(filterName, filters[filterName]);
	});
};

// Add Nunjucks function called 'checked' to populate radios and checkboxes
export const addCheckedFunction = (env) => {
	env.addGlobal('checked', function checkedFunc(name, value) {
		// Check data exists
		if (this.ctx.data === undefined) {
			return '';
		}

		const storedValue = this.ctx.data[name];

		// Check the requested data exists
		if (storedValue === undefined) {
			return '';
		}

		let checked = '';

		// If data is an array, check it exists in the array
		if (Array.isArray(storedValue)) {
			if (storedValue.indexOf(value) !== -1) {
				checked = 'checked';
			}
		} else if (storedValue === value) {
			// The data is just a simple value, check it matches
			checked = 'checked';
		}
		return checked;
	});
};
