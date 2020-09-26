/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');
const _ = require('lodash');

module.exports = {

  tableName: 'users',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    role_id: {
      model: 'role'
    },
    firstname: 'string',
    lastname: 'string',
    fullname: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: 'string',
    gender: 'string',
    dob: {
      type: 'string',
      columnType: 'date'
    },
    phone: 'string',
    image: 'string',
    address: 'string',
    city: 'string',
    country: 'string',
    about: 'string',
    quote: 'string',
    status: 'string',
    created_date: {
      type: 'string',
      columnType: 'date'
    },
    updated_date: {
      type: 'string',
      columnType: 'date'
    },
    vkey: 'string',
    verified: 'number',
    password_types: 'number',
    password_expired_date: {
      type: 'string',
      columnType: 'date'
    },
    expired: 'number'

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  // customToJSON: () => {
  //   sails.log(this);
  //   return _.omit(this, ['password']);
  // },

  beforeCreate: async (user, cb) => {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) {
        return cb(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if(err) {
          return cb(err);
        }
        user.password = hash;
        user.fullname = user.firstname + user.lastname;
        const now = moment().format();
        user.created_date = now;
        user.updated_date = now;
        user.dob = now;
        user.password_expired_date = now;
        return cb();
      });
    });
  },
};

