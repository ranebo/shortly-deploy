var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LinkSchema = new Schema({
  url: {
    type: String
  },
  baseUrl: {
    type: String
  },
  code: {
    type: String
  },
  title: {
    type: String
  },
  visits: {
    type: Number
  },
  date: { 
    type: Date, default: Date.now
  } 
});

var Link = mongoose.model('Link', LinkSchema);

//HOW WE ORIGINALLY WROTE IT, NOT SURE WHY THIS DOESN"T WORK BUT SOLUTION VERSION DOES?
// LinkSchema.pre = ('save', function(next) {
//   var shasum = crypto.createHash('sha1');
//   shasum.update(this.url);
//   this.code = shasum.digest('hex').slice(0, 5);
//   next();
// });

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

LinkSchema.pre('save', function(next) {
  var code = createSha(this.url);
  this.code = code;
  next();
});

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
    // this.on('creating', function(model, attrs, options) {
    //   var shasum = crypto.createHash('sha1');
    //   shasum.update(model.get('url'));
    //   model.set('code', shasum.digest('hex').slice(0, 5));
    // });
//   }
// });

module.exports = Link;
