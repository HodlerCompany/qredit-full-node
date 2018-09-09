'use strict'; /*jslint mocha:true, expr:true */

var node = require('./../node.js');

describe('GET /api/peers/version', function () {

	it('should be ok', function (done) {
		node.get('/api/peers/version', function (err, res) {
			node.expect(res.body).to.have.property('success').to.be.ok;
			node.expect(res.body).to.have.property('build').to.be.a('string');
			node.expect(res.body).to.have.property('version').to.be.a('string');
			done();
		});
	});
});

describe('GET /api/peers', function () {

	it('using empty parameters should fail', function (done) {
		var params = [
			'state=',
			'os=',
			'shared=',
			'version=',
			'limit=',
			'offset=',
			'orderBy='
		];

		node.get('/api/peers?' + params.join('&'), function (err, res) {
			node.expect(res.body).to.have.property('success').to.be.not.ok;
			node.expect(res.body).to.have.property('error');
			done();
		});
	});


	it('using limit > 100 should fail', function (done) {
		var limit = 101;
		var params = 'limit=' + limit;

		node.get('/api/peers?' + params, function (err, res) {
			node.expect(res.body).to.have.property('success').to.be.not.ok;
			node.expect(res.body).to.have.property('error');
			done();
		});
	});

	it('using invalid parameters should fail', function (done) {
		var params = [
			'state=invalid',
			'os=invalid',
			'shared=invalid',
			'version=invalid',
			'limit=invalid',
			'offset=invalid',
			'orderBy=invalid'
		];

		node.get('/api/peers?' + params.join('&'), function (err, res) {
			node.expect(res.body).to.have.property('success').to.be.not.ok;
			node.expect(res.body).to.have.property('error');
			done();
		});
	});
});

describe('GET /api/peers/get', function () {

	var validParams;

	before(function (done) {
		node.addPeers(1, function (err, headers) {
			validParams = headers;
			done();
		});
	});

	it('using known ip address with no port should fail', function (done) {
		node.get('/api/peers/get?ip=127.0.0.1', function (err, res) {
			node.expect(res.body).to.have.property('success').to.be.not.ok;
			node.expect(res.body).to.have.property('error').to.equal('Missing required property: port');
			done();
		});
	});

	it('using valid port with no ip address should fail', function (done) {
		node.get('/api/peers/get?port=' + validParams.port, function (err, res) {
			node.expect(res.body).to.have.property('success').to.be.not.ok;
			node.expect(res.body).to.have.property('error').to.equal('Missing required property: ip');
			done();
		});
	});

	it('using known ip address and port should be ok', function (done) {
		node.get('/api/peers/get?ip=127.0.0.1&port=4000', function (err, res) {
			node.expect(res.body).to.have.property('success').to.be.ok;
			node.expect(res.body).to.have.property('peer').to.be.an('object');
			done();
		});
	});

	it('using unknown ip address and port should fail', function (done) {
		node.get('/api/peers/get?ip=0.0.0.0&port=' + validParams.port, function (err, res) {
			node.expect(res.body).to.have.property('success').to.be.not.ok;
			node.expect(res.body).to.have.property('error').to.equal('Peer not found');
			done();
		});
	});
});
