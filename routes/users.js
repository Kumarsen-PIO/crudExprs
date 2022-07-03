const e = require('express');
var express = require('express');
var router = express.Router();
var connection = require('../db_config')

//create
router.post('/',(req,res)=>{
  let emp = req.body;
  let userDataQ = "INSERT INTO `user` (uid, name, cost, description) VALUES ( '" +emp.uid+"','"+emp.name+"','"+emp.cost+"','"+emp.description+ "' );";
  connection.query(userDataQ,
    (error,result)=>{
      if(!error) {
        res.send('user data added!');
      } else {
        res.send('error occured while adding data!!');
        console.log(error);
      }
    }
  )
})
//read
router.get('/', function(req, res, next) {
  let getUserQ = "SELECT * FROM `user`"
  connection.query(getUserQ,(error,result) => {
    if(error) {
      console.log(error);
      res.send("unable to fetch data")
    } else {
      res.send(result);
    }
  })
});

router.get('/user/:uid', (req,res,next) => {
  let getUserQ = "SELECT * FROM `user` WHERE `uid` = '"+req.params.uid+"'";

  connection.query(getUserQ,(error,result)=>{
    if(error) {
      console.log(error);
      res.send('unable to fetch user data! !');
    } else {
      res.send(result);
    }
  })
})
//update
router.put('/user/:uid',(req,res)=>{
  let emp = req.body;
  let userDataQ = "UPDATE `user` SET `name` = '"+emp.name+"' , `cost` = '"+emp.cost+"', `description` = '"+emp.description+"' WHERE `uid` = '"+req.params.uid+"'";
  connection.query(userDataQ,
    (error,result)=>{
      if(!error) {
        console.log(result);
        res.send('user data updated!');
      } else {
        res.send('error occured while updating user data!!');
        console.log(error);
      }
    }
  )
})
//delete
router.delete('/user/:uid',(req,res) => {
  let delUserQ = "DELETE FROM user WHERE uid = ? ";
  connection.query(delUserQ,[req.params.uid],(error,result) => {
    if(!error) {
      res.send('user with uid: '+req.params.uid+' got deleted');
    } else {
      res.send('error occured when deleting!')
      console.log(error);
    }
  })
})

module.exports = router;
