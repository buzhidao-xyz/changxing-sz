'use strict';

/**
 * Api Config
 */
var Api = {
	//host地址
	host: '/api/',
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
	},
	user: {
		uinfo: {
			m: 'get',
			u: 'user/info'
		},
		completeinfo: {
			m: 'get',
			u: 'user/complete_info'
		}
	},
	free: {
		mindex: {
			m: 'get',
			u: 'free/index'
		}
	}
};