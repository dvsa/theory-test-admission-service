const FieldValidator = function() {
	let returnedValue="";
	let emptyMessage, notValidMessage, regexes, control, controlGroup, controlHelp, removeSpaces, fieldRequired,

		init = function(controlId, notValidMsg, emptyMsg, regex,removeSpaceFn,required) {

			emptyMessage = emptyMsg;
			notValidMessage = notValidMsg;
			regexes = regex;
			removeSpaces = removeSpaceFn;

			//If required field not sent, set to false
			if (required == null) { fieldRequired = true; } else {fieldRequired = required}

			control = $("#" + controlId)
			controlGroup = $("#" + controlId + "-control-group")
			controlHelp = $("#" + controlId + "-help")

			/*
				The timeout on the function below resolves the conflict between
				focusout event on the input field and click event on the submit button
				Without it the click event will not fire on the first user click (provided
				there are validation errors)
			*/
			control.on("focusout", function() { window.setTimeout(validate, 100) }).on("focus", removeValidationError)

		},

		validate = function() {

			returnedValue = "";
			var value = control.val();
			if ($.isFunction(removeSpaces)) {
				value = removeSpaces(value);
				control.val(value);
			}
			returnedValue = value;

			if (fieldRequired == true) {
				if (value == "") {
					controlGroup.addClass("form-group-error");
					controlGroup.children("input[type=text]").addClass("form-control-error");
					controlHelp.text(emptyMessage);
					return false;
				}
			}

			if (someRegexMatches(value)) {
				controlGroup.removeClass("form-group-error");
				controlGroup.children("input[type=text]").removeClass("form-control-error");
				controlHelp.text("");
				return true;
			}

			controlGroup.addClass("form-group-error");
			controlGroup.children("input[type=text]").addClass("form-control-error");
			controlHelp.text(notValidMessage);
			return false;
		},

		removeValidationError = function() {
			controlGroup.removeClass("form-group-error");
			controlGroup.children("input[type=text]").removeClass("form-control-error");

			controlHelp.text("");
			if ($.isFunction(removeSpaces)) {
				control.val(returnedValue);
			}
		},

		someRegexMatches = function(value) {
			//If no regex sent, just return true
			if (regexes.length == 0) return true;

			//If optional, ignore regex until something is entered
			if (value == "" &&  !fieldRequired) return true;
			for (var i = 0; i < regexes.length; i++) {
				if (value.match(regexes[i]) != null) {
					return true;
				}
			}
			return false;
		};

	return {
		init: init,
		validate: validate,
		removeValidationError: removeValidationError
	}
}


const removeSpace = function(value){
    return value.trim();
}

const removeAllSpace = function(value){
    return value.replace(/\s/g,"");
}

const dlnValidator = FieldValidator();

dlnValidator.init(
    'DLN',
    'Enter a valid driving licence number.',
    'Enter your driving licence number.',
    [/^(?=.{16,18}$)[A-Za-z]{1,5}9{0,4}[0-9](?:[05][1-9]|[16][0-2])(?:[0][1-9]|[12][0-9]|3[01])[0-9](?:99|[A-Za-z][A-Za-z9])(?![IOQYZioqyz01_])\w[A-Za-z]{2}[0-9]{0,2}$/i], removeAllSpace);

$('body').on('submit', 'form', function (e) {
    var isValid = true;
    isValid = dlnValidator.validate() && isValid;
    return isValid;
});
