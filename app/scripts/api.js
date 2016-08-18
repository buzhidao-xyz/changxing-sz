'use strict';

/**
 * Api Config
 */
var Api = {
	//host地址
	host: 'http://192.168.10.108:8080/api/',
	route: {
		subcribe: {
			m: 'get',
			u: 'route/subcribe'
		},
		all: {
			m: 'get',
	  		u: 'route/all'
		},
		echars: {
			m: 'get',
	  		u: 'route/echars_option'
		},
		subcribecheck: {
			m: 'get',
	  		u: 'route/subcribe/check'
		}
	},
	subcribe: {
		m: 'get',
		u: 'subcribe'
	},
	unsubcribe: {
		m: 'get',
		u: 'unsubcribe'
	}
};