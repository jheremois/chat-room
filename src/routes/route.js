const express = require('express')
const control = require('../controller/control')

const router = express.Router()

module.exports = ()=>{
   // Login route:
   router.get('/', control.login)
   // Chat room route:
   router.post('/chat_room',control.chat)
   return router
}