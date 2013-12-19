define('lib/app', ['module', 'dom', 'underscore'], function (module, $, _) {
	"use strict";

	var $element = $(document.body),
		templates = {};

	function template(name, data) {
		var normalizedName = name.replace(/[^a-z]+/gi, '-'),
			element;
		if (!templates[normalizedName]) {
			element = document.querySelector(['#', normalizedName].join(''));
			if (!element) {
				throw new Error(['Template', name, 'not found'].join(' '));
			}
			templates[normalizedName] = _.template(element.innerHTML);
		}
		return templates[normalizedName](data);
	}


	return {
		'$root': $element,
		template: template
	};

});
