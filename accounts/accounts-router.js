const express = require('express');

const db = require("../data/dbConfig.js");

const { isValidPost } = require("./accounts-service.js");

const router = express.Router();

router.get('/', (req, res) => {
  db.select("*")
  .from("accounts")
  .then(accounts => {
    res.status(200).json({ data: accounts})
  })
  .catch(err => {
    res.status(500).json({ error: err.message })
  })
})

router.get('/:id', (req, res) => {
  db("accounts")
  .where({ id: req.params.id })
  .then(account => {
    if(account){
      res.status(200).json({ data: account})
    } else {
      res.status(404).json({ message: "No account by that ID"})
    }
  })
  .catch(err =>{
    res.status(500).json({ error: err.message })
  })
})

router.post('/', (req, res) => {
  const post = req.body;

  if(isValidPost(post)){
    db("accounts")
    .insert(post, "id" );
  }
});

router.put('/:id', (req, res) =>{ 
  const newInfo = req.body;

  db("accounts")
  .where({ id: req.params.id })
  .update(newInfo)
  .then(count =>{
    if(count > 0){
      res.status(200).json({ data: count })
    } else {
      res.status(404).json({ message: "Record not found by that ID"});
    }
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
});

router.delete('/:id', (req, res) => {
  db("accounts")
  .where({ id: req.params.id })
  .del()
  .then(count => {
    if( count > 0){
      res.status(200).json({ data: count })
    } else {
      res.status(404).json({ message: "Record not found by that ID "})
    }
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
})

module.exports = router;