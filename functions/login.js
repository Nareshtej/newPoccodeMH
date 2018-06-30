

'use strict'

const user = require('../models/account');

exports.credential = (walletName, password, usertype) =>

    new Promise((request, resolve) =>{

user.find({ $and: [{"walletName": walletName}, {"password": password}, {"usertype": usertype}]})
      .then(function(userdetails){
        console.log("record response", userdetails)
        if(userdetails.length!=0){

            resolve({
                status: 200,
                userdetails: userdetails[0]
            });
        } else if(userdetails.length==0){
            reject({
                status: 401,
                message: 'Invalid credentials'
            });
        }


      })

    });
