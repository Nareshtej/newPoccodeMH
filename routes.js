
'use strict'

var cors = require('cors');
var nem = require('nem-sdk').default;
var register = require('./functions/register');
var login = require('./functions/login');

//========mock service=====
module.exports = router => {
    router.post('/mock',cors(),function(req, res){
         console.log(req.body);
         res.send({message: "mock service"});
    })

//=========
router.get('/', (req, res) => res.end('welcome to document management system'));

//========Register service======
router.post('/register', cors(), function(req, res){
     //getting values from user
    const walletName = req.body.walletName;
    console.log("wallet Name >>>>>>>>>>>>>", walletName)
    const password = req.body.password;
    console.log("password >>>>>>>>>>>>", password)
    const usertype = req.body.usertype;
    console.log("Type of user >>>>>>>>>>>",usertype)

    // create PRNG wallet
    const nem_id = nem.model.wallet.createPRNG(walletName, password, nem.model.network.data.mijin.id);

    // create endpoint
    var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");

    // create common object
    var common = nem.model.objects.create("common")(password, "");
    console.log("common object >>>>>>>>>>>>", common)

    //Get the wallet account to decrypt
    var walletAccount = nem_id.accounts[0];
    console.log("wallet account details >>>>>>>>>>>>>", walletAccount)

    //Decrypt account private key
    nem.crypto.helpers.passwordToPrivatekey(common, walletAccount, "pass:bip32");

    //The common object now has a private key
    console.log("my private key :"+ JSON.stringify(common.privateKey))
    const privateKey = common.privateKey;
    console.log("my private", privateKey)
     
    //routing to function for saving user details
    register.userRegister(nem_id, privateKey, walletName, password, usertype)
    .then(result => {
        
        res.status(result.status).json({
            message: result.message,
            usertype:usertype
           
          
        });

    })
    .catch(err => res.status(err.status).json({message: err.message}).json({status: err.status}));


})

//============Login===============
router.post('/login', cors(), function(req, res){

    const walletName = req.body.walletName;
    const password = req.body.password;
    const usertype = req.body.usertype;


    login.credential(walletName, password, usertype)
    .then(result => {
        console.log("Result of login", result)
        const token = jwt.sign(result, "Docmgmt@2018",{
            expiresIn: 60000000000
        })
        
        res.status(result.status).json({
            "message": "Login successful",
            "status": true,
            token: token,
            "usertype": result.userdetails.usertype
        })


    })
    .catch(err => res.status(err.status).json({
        message: err.message
    }).json({
        status: err.status
    })
);
})

//=================
}

