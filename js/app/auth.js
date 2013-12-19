define('app/auth', [
	'dom', 'underscore', 'lib/app', 'app/firebase/auth', 'lib/messenger'
], function ($, _, app, auth, messenger) {
	"use strict";


	var isLoggedIn = null,
		authObject = auth(function (error, user) {
			if (error) {
				if (isLoggedIn === true) {
					app.$root.trigger('app/auth:logout:fail', [error]);
				} else if (isLoggedIn === false) {
					app.$root.trigger('app/auth:login:fail', [error]);
				}
				app.$root.trigger('app/auth:error', [error]);
			} else if (user) {
				if (isLoggedIn === false) {
					app.$root.trigger('app/auth:login:success', [user]);
				}
				app.$root.trigger('app/auth:user', [user]);
				isLoggedIn = true;
			} else {
				if (isLoggedIn) {
					app.$root.trigger('app/auth:logout:success');
				}
				app.$root.trigger('app/auth:guest');
				isLoggedIn = false;
			}
		});


	function login(provider) {
		var options = {rememberMe: true};
		return authObject.login(provider, options);
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
		var provider = $(event.target).closest('.jsAppAuth-login').data('app-auth');
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
