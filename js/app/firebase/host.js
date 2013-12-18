define('app/firebase/host', ['module'], function (module) {
	"use strict";

	var config = module.config();
	if (!config.url) {
		throw new Error('app/firebase/host url must be configured');
	}
	return config.url;
});
