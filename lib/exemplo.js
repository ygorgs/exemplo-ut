var http = require('http');
var util = require('./utils');

exports.chamaServico = function(callback) {
    http.request(util.getUrl(), function(response) {
        var stringResposta = '';

        response.on('data', function(data) {
            stringResposta += data;
        });

        response.on('end', function() {
    		callback(JSON.parse(stringResposta));
		});
    }).end();
};
