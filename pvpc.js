var rest = require('restler');

pvpc = rest.service(function() {
  this.defaults.username = 'pvpc';
  this.defaults.password = 'pefalpe987';
}, {
  baseURL: 'http://localhost:3000'
});
