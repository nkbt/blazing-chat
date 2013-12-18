define('lib/app', ['module', 'dom', 'underscore'], function (module, $, _) {
	"use strict";
	
	var $element = $(document.body),
		templates = {};

	function template(name, data) {
		var element;
		if (!templates[name]) {
			element = document.querySelector(['#', name.replace(/\//g, '\\\\/')].join(''));
			console.log("element", element);
			if (!element) {
				throw new Error('Template not found');
			}
			templates[name] = _.template(element.innerHtml);
		}
		return templates[name](data);
	}


	return {
		'$root': $element,
		template: template
	};

});
