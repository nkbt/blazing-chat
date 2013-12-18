define('app/user', [
	'dom', 'underscore', 'lib/app', 'app/auth'
], function ($, _, app, auth) {
	"use strict";

	function handleUser(user) {
//		console.log('user', user);
		var isGuest = _.isEmpty(user);
		app.$root.find('.jsAppUser-guest').toggle(isGuest);
		app.$root.find('.jsAppUser-user').toggle(!isGuest);
		if (isGuest) {
			return;
		}

		if (user.provider === "facebook") {
			user.avatar = ['/', 'graph.facebook.com', user.username, 'picture'].join('/');
		} else if (user.provider === "twitter") {
			user.avatar = user.profile_image_url;
		} else {
			var photo = user.photos && user.photos.shift();
			user.avatar = photo && photo.value || "";
		}
		console.log('user', user);
		app.fill(app.$root, 'data-app_user-user', user);
	}
	
	
	function onGuest() {
		console.log("onGuest");
		
		app.$root.find('.jsAppUser-container').append(app.template('template/app/user/guest'));
		app.$root.find('.jsAppUser-guest').show();
		app.$root.find('.jsAppUser-user').hide();
	}
	function onLogin() {
		console.log("onGuest");
		app.$root.find('.jsAppUser-guest').hide();
		app.$root.find('.jsAppUser-user').show();
	}
	function onLogout() {
		console.log("onGuest");
		app.$root.find('.jsAppUser-guest').show();
		app.$root.find('.jsAppUser-user').hide();
	}

	app.$root
		.on('app/auth:guest', onGuest)
		.on('app/auth:login:success', onLogin)
		.on('app/auth:logout:success', onLogout);


});
