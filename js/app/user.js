define('app/user', [
	'dom', 'underscore', 'lib/app', 'app/auth'
], function ($, _, app, auth) {
	"use strict";

	function normalizeUser(user) {
		var extended = {}, photo;
		if (user.provider === "facebook") {
			extended.avatar = ['/', 'graph.facebook.com', user.username, 'picture'].join('/');
		} else if (user.provider === "twitter") {
			extended.avatar = user.profile_image_url;
		} else if (user.provider === "github") {
			extended.avatar = ['//www.gravatar.com/avatar/', user.gravatar_id, '.jpg?s=24&d=identicon'].join('');
		} else {
			photo = user.photos && user.photos.shift();
			extended.avatar = photo && photo.value || "";
		}
		return _.extend({}, user, extended);
	}


	function onGuest() {
		app.$root.find('.jsAppUser-container')
			.html(app.template('template/app/user/guest'));
		app.$root.find('.jsAppUser-guest').show();
		app.$root.find('.jsAppUser-user').hide();
	}


	function onUser(event, user) {
		app.$root.find('.jsAppUser-container')
			.html(app.template('template/app/user/user', {user: normalizeUser(user)}));
		app.$root.find('.jsAppUser-guest').hide();
		app.$root.find('.jsAppUser-user').show();
	}


	app.$root
		.on('app/auth:user', onUser)
		.on('app/auth:guest', onGuest);


});
