var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LinkSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  baseUrl: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  visits: {
    type: Number,
  },
  date: { 
    type: Date, default: Date.now
  } 
});

var Link = mongoose.model('Link', LinkSchema);

LinkSchema.pre = ('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
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
