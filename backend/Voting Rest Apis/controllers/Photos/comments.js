const db = require('../config/db/db.js');
const { validationResult } = require('express-validator');

exports.AddComment = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({
            message_type:'error',
            message: errors.array()
        })
    }
    var Photo_Id = req.params.id;
    await db.select().from('tbl_Photo').where({Id: Photo_Id}).then(async(photo_res) => {
        if(photo_res.length>0){
            var Comments = req.body.Comments;
            await db('tbl_Comment').insert({ Photo_Id, Comments }).then((comment_res) => {
                res.json({
                    message_type: 'success',
                    message: 'Comment Added Successfully!'
                })
            }).catch((err)=> {
                    res.json({
                        message_type: 'error',
                        message: err.message
                    })
            })
        }
        else{
            res.json({
                message_type: 'error',
                message: 'Photo_Id does not exist.'
            })
        }   
    }).catch(err => {
        res.json({
            message_type: 'error',
            message: err.message
        })
    })  
}

exports.LoadComments = async (req, res) => {
    var Photo_Id = req.params.id;
    if(Photo_Id != undefined){
        await db.select('Comments').from('tbl_Comment').where({Photo_Id}).then((comment_res) => {
            if(comment_res.length>0){
                res.json({ 
                    data: comment_res,
                    message_type: 'success',
                    message: 'Comments Loaded Successfully!',        
                })
            }
            else{
                res.json({ 
                    message_type: 'success',
                    message: 'No Comment Found',        
                })
            }
        }).catch((err)=> {
            res.json({
                message_type: 'error',
                message: err.message
            })
        }) 
    }
    else{
        res.json({
            message_type: 'error',
            message: 'Photo_Id does not exist.'
        })
    } 
}