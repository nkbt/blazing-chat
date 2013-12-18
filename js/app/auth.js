define('app/auth', [
	'dom', 'underscore', 'lib/app', 'app/firebase/auth'
], function ($, _, app, auth) {
	"use strict";

	var authObject = auth(function (error, user) {
		console.log("error, user", error, user);
		if (error) {
			app.$root.trigger('app/auth:login:fail', [error]);
		} else if (user) {
			app.$root.trigger('app/auth:login:success', [user]);
		} else {
			app.$root.trigger('app/auth:guest');
		}
	});


	function login(provider) {
		return authObject.login(provider, {
			rememberMe: true
		});
	}

	function logout() {
		return authObject.logout();
	}

	function onLogin(event, provider) {
		return login(provider);
	}


	function onLogout() {
		return logout();
	}

	function onClickLogin(event) {
		var provider = $(event.target).closest('.jsAppAuth-login').data('appAuth');
		return login(provider);
	}


	function onClickLogout() {
		return logout();
	}

	app.$root
		.on('app/auth:login', onLogin)
		.on('app/auth:logout', onLogout)
		.on('click', '.jsAppAuth-login', onClickLogin)
		.on('click', '.jsAppAuth-logout', onClickLogout);


});
