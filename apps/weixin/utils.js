var fs = require('fs');
var file_access_token = __dirname + '/../../config/access_token.txt';
var file_ticket_token = __dirname + '/../../config/ticket_token.txt';

exports.getToken = function(callback) {
  console.log('getToken');
  fs.readFile(file_access_token, 'utf8', function(err, txt) {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(txt || '{}'));
  });
};

exports.saveToken = function(token, callback) {
  console.log('savetoken',token);
  fs.writeFile(file_access_token, JSON.stringify(token), callback);
};

// getTicketToken
function getTicketToken(callback) {
    fs.readFile(file_ticket_token, 'utf8', function(err, txt) {
      if (err) {
        return callback(err);
      }
      callback(null, JSON.parse(txt || '{}'));
    });
  }
  // saveTicketToken
function saveTicketToken(_ticketToken, callback) {
  fs.writeFile(file_ticket_token, JSON.stringify(token), callback);
}
