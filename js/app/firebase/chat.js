define('app/firebase/chat', ['app/firebase/host', 'Firebase'], function (host, Firebase) {
	"use strict";
	return new Firebase([host, 'chats'].join('/'));
});
