'use strict';

var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;





















































var utils = {

  listRestaurants: function (cb) {
    pg.connect(DATABASE, function (error, client, done) {
      if (error) {
        return cb(error);
      }

      var query = 'SELECT * FROM restaurantswithtypes';

      client.query(query, function (err, result) {
        done();

        if (err) {
          return cb(error);
        } else {
          return cb(null, result.rows);
        }
      });
    });
  }

};

module.exports = utils;



module.exports.getRestaurantById = function getRestaurantById (id, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = "SELECT * FROM restaurantswithtypes WHERE restaurant_id = '"+id+"'";

    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.addRest = function addRest (restaurant_id, name, address, city, zip, formattedaddress, horizontal, vertical, logo, phonenumber,
                url, pizza, hamburger, sushi, seafood, steak, indian, italian, american, asian, french,
                vegan, vegetarian, fastfood, fancy, mexican, healthy, cb) {
    create(restaurant_id, name, address, city, zip, formattedaddress, horizontal, vertical, logo, phonenumber,
                url, pizza, hamburger, sushi, seafood, steak, indian, italian, american, asian, french,
                vegan, vegetarian, fastfood, fancy, mexican, healthy, cb);
};

function create (restaurant_id,name, address, city, zip, formattedaddress, horizontal, vertical, logo, phonenumber,
                url, pizza, hamburger, sushi, seafood, steak, indian, italian, american, asian, french,
                vegan, vegetarian, fastfood, fancy, mexican, healthy, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [restaurant_id, name, address, city, zip, formattedaddress, horizontal, vertical, logo, phonenumber,
                url, pizza, hamburger, sushi, seafood, steak, indian, italian, american, asian, french,
                vegan, vegetarian, fastfood, fancy, mexican, healthy];
    var query = 'INSERT into new_restaurants' +
                '(restaurant_id, name, address, city, zip, formattedaddress, horizontal, vertical, logo, phonenumber,' +
                  'url, pizza, hamburger, sushi, seafood, steak, indian, italian, american, asian, french, vegan, vegetarian,' +
                  'fastfood, fancy, mexican, healthy)' +  
                'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,' +
                      '$13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        console.error(err);
        return cb(error);
      } else {
        return cb(null, true);
      }
    });
  });
}

module.exports.getMaxId = function getMaxId (cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = "SELECT MAX(restaurant_id) FROM new_restaurants";

    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};


module.exports.listRestaurantsInRadius = function listRestaurantsInRadius(restaurants, distance, horizontal, vertical) {

  var restaurantsInRadius = [];

  for(var i = 0; i < restaurants.length; ++i) {
      var x = restaurants[i];
      
      var calcDistance = utils.calcDistance(horizontal, x.horizontal, vertical, x.vertical, 0.0, 0.0);

      if(calcDistance <= distance) {
          x["distance"] = parseInt(calcDistance, 10);
          restaurantsInRadius.push(x);
      }
  }
  return restaurantsInRadius;
};


module.exports.calcDistance = function calcDistance(startHor, endHor, startVer, endVer, el1, el2) {

  function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
  }
    // Radius of the earth in km
  var R = 6371;
  var horDistance = toRad(endHor - startHor);
  var verDistance = toRad(endVer - startVer);
  var a = Math.sin(horDistance / 2) * Math.sin(horDistance / 2)
          + Math.cos(toRad(startHor)) * Math.cos(toRad(endHor))
          * Math.sin(verDistance / 2) * Math.sin(verDistance / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // convert to meters
  var distance = R * c * 1000;
  var height = el1 - el2;
  distance = Math.pow(distance, 2) + Math.pow(height, 2);

  return Math.sqrt(distance);
};




















// module.exports.listRestaurants = function listRestaurants (cb) {
//   pg.connect(DATABASE, function (error, client, done) {
//     if (error) {
//       return cb(error);
//     }

//     var query = 'SELECT * FROM restaurants';

//     client.query(query, function (err, result) {
//       done();

//       if (err) {
//         return cb(error);
//       } else {
//         return cb(null, result.rows);
//       }
//     });
//   });
// };




/*
module.exports.listUsers = function listUsers (cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = 'SELECT username FROM users LIMIT 20';
    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

// My code here

module.exports.listText = function listText (username, date, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var user = username.trim();
    console.log("date: " + date);

    var query = "SELECT * FROM comments WHERE username LIKE '"+user+"%' ORDER BY date DESC";

    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.listDiary = function listDiary (username, id, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var user = username.trim();
    console.log("id: " + id);

    var query = "SELECT * FROM comments WHERE username LIKE '"+user+"%' AND id = '"+id+"'";

    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.deleteDiary = function deleteDiary (id,cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = "DELETE FROM comments WHERE id = '"+id+"'";

    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.createComment = function createComment (username, title, text, date, cb) {
    createCommentFromUser(username, title, text, date, cb);
};

function createCommentFromUser (username, title, text, date, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username, text, date, title];
    var query = 'INSERT into comments' +
                '(username, text, date, title) VALUES($1, $2, $3, $4)';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        console.error(err);
        return cb(error);
      } else {
        return cb(null, true);
      }
    });
  });
}
*/