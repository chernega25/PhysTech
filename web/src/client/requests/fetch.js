const realFetch = require('node-fetch');

const fetch = function(url, options) {
	if (/^\/\//.test(url)) {
		url = 'http:' + url;
	}
	return realFetch.call(this, url, options);
};

if (!global.fetch) {
	global.fetch = fetch;
	global.Response = realFetch.Response;
	global.Headers = realFetch.Headers;
	global.Request = realFetch.Request;
}

export default fetch;