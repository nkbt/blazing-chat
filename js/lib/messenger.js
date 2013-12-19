define('lib/messenger', [
	'module', 'dom', 'underscore', 'lib/app'
], function (module, $, _, app) {
	"use strict";

	var config = _.defaults(module.config(), {
		hideTimeout: 2000,
		types: {
			TYPE_ERROR: 'error',
			TYPE_MESSAGE: 'message'
		}
	});

	function getElement() {
		var $element = app.$root.find('.jsLibMessenger');
		if (!$element.length) {
			$element = $(app.template('template/lib/messenger'));
			$element.appendTo(app.$root);
		}
		return $element;
	}

	function show(type, text) {
		if (!_.findWhere(config.types, type)) {
			return console.warn('lib/messenger', 'unknown type', type);
		}
		var $element = getElement(),
			$message = $(app.template(['template/lib/messenger', type].join('/'), {text: text}));

		return $message
			.prependTo($element)
			.trigger('lib/messenger:show:done', [type, text])
			.trigger('lib/messenger:hideDelayed');
	}


	function onShow(event, type, text) {
		return show(type, text);
	}


	function clearTimer(message) {
		var $message = $(message),
			timer = $message.data('lib-messenger-hide-timeout');
		if (timer) {
			window.clearTimeout(timer);
			timer = null;
		}
		$message.data('lib-messenger-hide-timeout', timer);
	}


	function hide(message) {
		if (_.isEmpty(message)) {
			return _.each(app.$root.find('.jsLibMessenger-message'), hider);
		}

		var $message = $(message).closest('.jsLibMessenger-message');
		clearTimer($message);
		return $message.remove();
	}

	function hider(message) {
		return function () {
			hide(message);
		};
	}

	function onHideDelayed(event) {
		var $message = $(event.target).closest('.jsLibMessenger-message'),
			hideTimeout = parseInt(parseInt($message.data('lib-messenger-autohide'), 10) || config.hideTimeout, 10);
		clearTimer($message);
		return $message.data('lib-messenger-hide-timeout', window.setTimeout(hider($message), hideTimeout));
	}

	function onClick(event) {
		var $message = $(event.target).closest('.jsLibMessenger-message');
		clearTimer($message);
		return hide($message);
	}

	function onMouseover(event) {
		var $message = $(event.target).closest('.jsLibMessenger-message');
		return clearTimer($message);
	}

	app.$root
		.on('lib/messenger:show', null, onShow)
		.on('click', '.jsLibMessenger .jsLibMessenger-message', onClick)
		.on(
			'mouseover',
			'.jsLibMessenger .jsLibMessenger-message[data-lib-messenger-autohide]',
			onMouseover
		)
		.on(
			'mouseout',
			'.jsLibMessenger .jsLibMessenger-message[data-lib-messenger-autohide]',
			onHideDelayed
		)
		.on(
			'lib/messenger:hideDelayed',
			'.jsLibMessenger .jsLibMessenger-message[data-lib-messenger-autohide]',
			onHideDelayed
		);


	return config.types;
});
