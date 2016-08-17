'use strict';

/**
 * Api Config
 */
var Api = {
	//host地址
	host: 'http://wx.ilisin.xlh-tech.com/api/',
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