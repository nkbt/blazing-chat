define('app/chat', [
	'dom', 'underscore', 'lib/app'
], function ($, _, app) {
	"use strict";

	function init() {
		var $element = $('.jsAppChat').html(app.template('template/app/chat'));
		$element.find('.jsAppChat-formContainer')
			.html(app.template('template/app/chat/form'));
	}

	function onSubmit(event) {
		event.preventDefault();
		var $form = $(event.target).closest('.jsAppChat-form'),
			$input = $form.find('input[name=text]');
		$input.trigger('app/chat:addMessage', [$input.val()]);
	}

	app.$root
		.on('submit', '.jsAppChat .jsAppChat-form', onSubmit);

	$(init);
});
