'use strict';

module.exports = {
	open: {
		id: 'accounts.openAccount',
		type: 'object',
		properties: {
			secret: {
				type: 'string',
				minLength: 1,
				maxLength: 100
			}
		},
		required: ['secret']
	},
	getBalance: {
		id: 'accounts.getBalance',
		type: 'object',
		properties: {
			address: {
				type: 'string',
				minLength: 1,
				format: 'address'
			}
		},
		required: ['address']
	},
	getPublicKey: {
		id: 'accounts.getPublickey',
		type: 'object',
		properties: {
			address: {
				type: 'string',
				minLength: 1,
				format: 'address'
			}
		},
		required: ['address']
	},
	generatePublicKey: {
		id: 'accounts.generatePublickey',
		type: 'object',
		properties: {
			secret: {
				type: 'string',
				minLength: 1
			}
		},
		required: ['secret']
	},
	getDelegates: {
		id: 'accounts.getDelegates',
		type: 'object',
		properties: {
			address: {
				type: 'string',
				minLength: 1,
				format: 'address'
			}
		},
		required: ['address']
	},
	addDelegates: {
		id: 'accounts.addDelegates',
		type: 'object',
		properties: {
			secret: {
				type: 'string',
				minLength: 1
			},
			publicKey: {
				type: 'string',
				format: 'publicKey'
			},
			secondSecret: {
				type: 'string',
				minLength: 1
			}
		}
	},
	getAccount: {
		id: 'accounts.getAccount',
		type: 'object',
		properties: {
			address: {
				type: 'string',
				minLength: 1,
				format: 'address'
			}
		},
		required: ['address']
	},
	top: {
		id: 'accounts.top',
		type: 'object',
		properties: {
			limit: {
				type: 'integer',
				minimum: 0,
				maximum: 100
			},
			offset: {
				type: 'integer',
				minimum: 0
			}
		}
	}
};
