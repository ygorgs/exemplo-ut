// test/test.js

var assert = require('assert');
var exemplo = require('../lib/exemplo');
var retornoFacebook = {
   "error": {
      "message": "An access token is required to request this resource.",
      "type": "OAuthException",
      "code": 104,
      "fbtrace_id": "ClyUz/dMceY"
   }
};
var sinon = require('sinon');
var http = require('http');
var mockery = require('mockery');
var util = require('../lib/utils');
var server;

before(function() {    server = http.createServer(function(req, res) {
    	res.writeHead(200, { 'content-type': 'application/json' });
    	res.write(JSON.stringify(retornoFacebook));
    	res.end();
	});

    server.listen(3000, function() {
        console.log('Iniciando HTTP Server.');
    });

    var utilMock = sinon.stub(util, 'getUrl', function(){    	
    	return 'http://localhost:3000/';
    });

     mockery.registerMock('../lib/util', utilMock);
});

after(function() {
    server.close(function() {
        console.log('Finalizando HTTP Server');
    });
});

describe("exemplo-ut", function() {
    describe("request", function() {
        it('apenas true', function() {
            assert.equal(true, true);
        });

        it('chamada ao servico', function() {
   			exemplo.chamaServico(function(response) {
        		assert.deepEqual(retornoFacebook, response);
        		  done();
   	 		});
		});
    });
});

