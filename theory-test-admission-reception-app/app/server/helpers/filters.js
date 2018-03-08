module.exports = function filtersFn() {
	/**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
	const filters = {};

	/* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

	/* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */

	/*
   * Usage:
   * {{ errorSummary | checkValidationErrors('fieldName')}}
  */
	filters.checkValidationErrors = function checkValidationErrors(errorSummary, fieldName) {
		if (!errorSummary) return false;
		const result = errorSummary.filter((item) => { return item.fieldId === fieldName; });
		return result.length > 0;
	};

	/*
   * Usage:
   * {{ errorSummary | checkValidationMessages('fieldName') }}
  */
	filters.checkValidationMessages = function checkValidationMessages(errorSummary, fieldName) {
		if (!errorSummary) return '';

		for (let i = 0; i < errorSummary.length; i += 1) {
			if (errorSummary[i].fieldId === fieldName) return errorSummary[i].message;
		}

		return '';
	};

	return filters;
};
