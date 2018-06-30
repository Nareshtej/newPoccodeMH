

'use strict'

const user = require('../models/account');

exports.userRegister = (nem_id, privateKey, walletName, password, usertype) =>

    new Promise((resolve, reject) => {

        const newUser = new user({
           nem_id: nem_id,
           privateKey: privateKey,
           walletName: walletName,
           password: password,
           usertype: usertype,
           created_at: new Date()
        });
        console.log("new user details: >>>>>>>>>", newUser);
        newUser.save()
        .then((result) => {  
            console.log(result)
            resolve({
                status: 201,
                usertype: usertype,
                message: 'created your wallet account'
            })
            
    })
    .catch(err =>{
        
        if(err.code == 11000){
              reject({
                  status: 409,
                  message: 'user already Registred'
              });
        } else {
            reject({
                status: 500,
                message: 'please Register'
            });
        }
    });

});

