// declaration
const expres = require('express')
const routes = expres.Router()
const { commentValidation} = require('../../controllers/validation.js')
// controllers
const Comments = require('../../controllers/Photos/comments.js');
routes.post('/AddComment/:id', commentValidation, Comments.AddComment);
routes.get('/LoadComments/:id', Comments.LoadComments);
module.exports = routes