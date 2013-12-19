require.config({
	urlArgs: window.noCacheSuffix,
	baseUrl: 'js',
	paths: {
		underscore: 'vendor/underscore',
		dom: 'vendor/jquery',
		bootstrap: '../lib/bootstrap/js/bootstrap',
		Firebase: 'https://cdn.firebase.com/v0/firebase',
		FirebaseSimpleLogin: 'https://cdn.firebase.com/v0/firebase-simple-login'
	},
	//waitSeconds: 0,
	shim: {
		async: {
			exports: 'async'
		},
		underscore: {
			exports: '_'
		},
		dom: {
			exports: 'jQuery'
		},
		Firebase: {
			exports: 'Firebase'
		},
		FirebaseSimpleLogin: {
			deps: ['Firebase'],
			exports: 'FirebaseSimpleLogin'
		},
		bootstrap: ['dom']
	},
	config: {
		'lib/app': {
			baseUrl: '../'
		},
		'app/firebase/host': {
			url: 'blazing-chat.firebaseio.com'
		}
	},
	deps: [
	]
});

// Load CSS
require([
	'vendor/require/css!../lib/bootstrap/css/bootstrap.css',
	'vendor/require/css!../lib/bootstrap/css/bootstrap-theme.css',
	'vendor/require/css!../lib/font-awesome/css/font-awesome.css',
	'vendor/require/css!../css/style.css'
], function () {
	'use strict';
	console.log('CSS loaded');
});

// Start the main app logic.
require([
	'bootstrap',
	'app/user',
	'app/chat',
	'app/auth-notification'
], function () {
	'use strict';

	console.log('App loaded');
});
