'use strict';

var express = require('express');
var router = express.Router();

var utils = require('../lib/utils');

// router.get('/', index);
// router.get('/error', error);
// router.get('/getRestaurants', getRestaurants);
// router.get('/:id([0-9]{1,8})', info);
// router.get('/feelinglucky', feelingLucky);
// router.get('/addrestaurant', addRestaurant);
// router.post('/addrestaurant', addRestaurantPost);
router.get('/', user);

module.exports = router;

/** route middlewares **/


function user(req, res) {

  var id = 1;
  
    utils.user(id, function (err, all) {
    console.log(all);
    console.log(err);
    res.send(all);
  });
}



































function feelingLucky(req, res, next) {
  var userLatitude = req.session.userLatitude;
  var userLongitude = req.session.userLongitude;
  var distance = req.session.distance*1000;

  console.log(userLatitude);
  console.log(userLongitude);
  console.log(distance);

  utils.listRestaurants(function (err, all) {

    var restaurants = utils.listRestaurantsInRadius(all, distance, userLatitude, userLongitude);

    var restaurant = restaurants[Math.floor(Math.random()*restaurants.length)];

    var url = restaurant.url;
    url = url.trim();
    if(url == "NULL") url = "";

    var phoneNumber = restaurant.phonenumber;
    phoneNumber = phoneNumber.trim();
    if(phoneNumber == "NULL") phoneNumber = "";
    
    res.render('feelinglucky', {title: 'Feeling Lucky - Svangur', name: restaurant.name, address: restaurant.address, phoneNumber: phoneNumber,
                        url: url, logo: restaurant.logo, latitude : restaurant.horizontal, longitude: restaurant.vertical,
                        userLatitude: userLatitude, userLongitude: userLongitude});
  });
}

function index(req, res, next) {
  var userLatitude = req.session.userLatitude;
  var userLongitude = req.session.userLongitude;

  res.render('index', { title: 'Info - Svangur', userLatitude: userLatitude, userLongitude: userLongitude});
}

function info(req, res, next) {
  var id = req.params.id;
  var userLatitude = req.session.userLatitude;
  var userLongitude = req.session.userLongitude;

  var defaultUserLatitude = 64.1417172;
  var defaultUserLongitude = -21.9288258;

  if(userLatitude == undefined) userLatitude = defaultUserLatitude;
  if(userLongitude == undefined) userLongitude = defaultUserLongitude;

  utils.getRestaurantById(id, function (err, all) {

    var url = all[0].url;
    url = url.trim();
    if(url == "NULL") url = "";

    var phoneNumber = all[0].phonenumber;
    phoneNumber = phoneNumber.trim();
    if(phoneNumber == "NULL") phoneNumber = "";

    res.render('info', {title: 'Svangur', name: all[0].name, address: all[0].address, phoneNumber: phoneNumber,
                        url: url, logo: all[0].logo, latitude : all[0].horizontal, longitude: all[0].vertical,
                        userLatitude: userLatitude, userLongitude: userLongitude});
  });
}

function getRestaurants(req, res) {
  req.session.userLatitude = req.query.latitude;
  req.session.userLongitude = req.query.longitude;
  req.session.distance = req.query.distance;

  var distance = req.query.distance*1000;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;

  var defaultLatitude = 64.1417172;
  var defaultLongitude = -21.9288258;

  if(latitude == undefined) latitude = defaultLatitude;
  if(longitude == undefined) longitude = defaultLongitude;

   utils.listRestaurants(function (err, all) {

    var restaurants = utils.listRestaurantsInRadius(all, distance, latitude, longitude);

    res.send(restaurants);
  });
}

function error(req, res) {
  // Caught and passed down to the errorHandler middleware
  throw new Error('borked!');
}

function addRestaurant(req, res, next) {

    res.render('addrestaurant', { title: 'Info - Add Restaurant'});
}

function addRestaurantPost(req, res, next) {
  

  utils.getMaxId(function (err, all) {
    var name = req.body.name;
    var address = req.body.address;
    var city = req.body.city;
    var zip = req.body.zip;
    var formattedaddress = req.body.formattedaddress;
    var horizontal = req.body.latitude;
    var vertical = req.body.longitude;
    var logo = req.body.logo;
    var phonenumber = req.body.phonenumber;
    var url = req.body.url;
    var pizza = req.body.pizza;
    var hamburger = req.body.hamburger;
    var sushi = req.body.sushi;
    var seafood = req.body.seafood;
    var steak = req.body.steak;
    var indian = req.body.indian;
    var italian = req.body.italian;
    var american = req.body.american;
    var asian = req.body.asian;
    var french = req.body.french;
    var vegan = req.body.vegan;
    var vegetarian = req.body.vegetarian;
    var fastfood = req.body.fastfood;
    var fancy = req.body.fancy;
    var mexican = req.body.mexican;
    var healthy = req.body.healthy;

    var restaurant_id = (all[0].max) + 1;
    console.log(restaurant_id);

  utils.addRest(restaurant_id,name, address, city, zip, formattedaddress, horizontal, vertical, logo, phonenumber,
                  url, pizza, hamburger, sushi, seafood, steak, indian, italian, american, asian, french, vegan, vegetarian,
                  fastfood, fancy, mexican, healthy, function (err, status) {
    if (err) {
      console.error(err);
    }

    var success = true;

    if (err || !status) {
      success = false;
    }
    res.render('addrestaurant', { title: 'Info - Add Restaurant', post: true, success: success});
    });
  });
}