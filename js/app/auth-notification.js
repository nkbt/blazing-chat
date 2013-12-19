define('app/auth-notification', [
	'dom', 'lib/app', 'lib/messenger'
], function ($, app, messenger) {
	"use strict";

	function onLoginSuccess(event, user) {
		app.$root.trigger('lib/messenger:show', [messenger.TYPE_MESSAGE, ["Logged in as '", user.displayName, "'"].join('')]);
	}

	
	function onLogoutSuccess() {
		app.$root.trigger('lib/messenger:show', [messenger.TYPE_MESSAGE, "Logout successful"]);
	}


	function onLoginFail(event, error) {
		app.$root.trigger('lib/messenger:show', [messenger.TYPE_ERROR, ["Login failed: ", error.message].join('')]);
	}


	function onLogoutFail(event, error) {
		app.$root.trigger('lib/messenger:show', [messenger.TYPE_ERROR, ["Logout failed: ", error.message].join('')]);
	}


	app.$root
		.on('app/auth:login:success', onLoginSuccess)
		.on('app/auth:login:fail', onLoginFail)
		.on('app/auth:logout:success', onLogoutSuccess)
		.on('app/auth:logout:fail', onLogoutFail);

});
