const db = require('../config/db/db.js');

exports.AddVote = async (req, res) => {
    var Id = req.params.id;
    if(Id != undefined){
        await db.select().from('tbl_Photo').where({Id}).then(async(photo_res) => {
            if(photo_res.length>0){
                var Vote_Count = photo_res[0].Vote_Count + 1;
                await db('tbl_Photo').update({ Vote_Count}).where({ Id }).then((photoUpdateRes) => {
                    if(photoUpdateRes==1){
                        res.json({
                            message_type: 'success',
                            message: 'VoteCount Incremented Successfully!'
                         })
                    }
                    else{
                        res.json({
                            message_type: 'error',
                            message: 'Something went wrong while incrementing VoteCount'
                        })
                    }   
                }).catch((err) => {
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
}

/*exports.LoadPhotos = async(req, res) => {
    await db.select("photo.Id",  "photo.Photo_Path", "photo.user",  "photo.Vote_Count",  db.raw('count("Comments") as ??', ['Total_Comments'])).from("tbl_Photo as photo").leftJoin('tbl_Comment as comm', 'photo.Id', 'comm.Photo_Id').groupBy("photo.Id",  "photo.Photo_Path", "photo.user",  "photo.Vote_Count").orderBy('photo.Id', 'asc').then(async(data_res)=> {      
        if(data_res.length>0){
            res.json({ 
                data: data_res,
                message_type: 'success',
                message: 'Data Fetched Successfully!',        
            })
        }
        else{
            res.json({ 
                message_type: 'success',
                message: 'No Record Found',        
            })
        }
    }).catch((err)=> {
        res.json({
            message_type: 'error',
            message: err.message
        })
    })
}
*/

exports.LoadPhoto = async(req, res) => {
   var page = req.query.page;
   var limit = 10 * page;
   await db.select("photo.Id",  "photo.Photo_Path", "photo.user",  "photo.Vote_Count",  db.raw('count("Comments") as ??', ['Total_Comments'])).from("tbl_Photo as photo").leftJoin('tbl_Comment as comm', 'photo.Id', 'comm.Photo_Id').groupBy("photo.Id",  "photo.Photo_Path", "photo.user",  "photo.Vote_Count").orderBy('photo.Id', 'desc').limit(limit) .then(async(data_res)=> {      
  // var limit= req.query.limit;
  // var offset = page*limit-limit;
    /*await db.select("photo.Id",  "photo.Photo_Path", "photo.user",  "photo.Vote_Count",  db.raw('count("Comments") as ??', ['Total_Comments'])).from("tbl_Photo as photo").leftJoin('tbl_Comment as comm', 'photo.Id', 'comm.Photo_Id').groupBy("photo.Id",  "photo.Photo_Path", "photo.user",  "photo.Vote_Count").orderBy('photo.Id', 'asc').limit(limit).offset(offset) .then(async(data_res)=> {*/      
        if(data_res.length>0){
            res.json({ 
                data: data_res,
                message_type: 'success',
                message: 'Data Fetched Successfully!',        
            })
        }
        else{
            res.json({ 
                message_type: 'success',
                message: 'No Record Found',        
            })
        }
    }).catch((err)=> {
        res.json({
            message_type: 'error',
            message: err.message
        })
    })
}

exports.Count = async(req, res) => {
    var Id = req.params.id;
    if(Id != undefined){
        await db.select("photo.Id", "photo.Vote_Count",  db.raw('count("Comments") as ??', ['Total_Comments'])).from("tbl_Photo as photo").leftJoin('tbl_Comment as comm', 'photo.Id', 'comm.Photo_Id').where('photo.Id', '=', Id ).groupBy("photo.Id",  "photo.Vote_Count").then(async(data_res)=> {      
            if(data_res.length>0){
                res.json({ 
                    data: data_res,
                    message_type: 'success',
                    message: 'Data Fetched Successfully!',        
                })
            }
            else{
                res.json({ 
                    message_type: 'success',
                    message: 'No Record Found',        
                })
            }
        }).catch((err)=> {
            res.json({
                message_type: 'error',
                message: err.message
            })
        })
    }
}



exports.AddPhoto = async (req, res) => {
    var filename = req.file.filename;
    if(filename != undefined){
        await db('tbl_Photo').insert({ Photo_Path:filename, user:'Asma', Vote_Count:0}).then((photo_res) => {
            res.json({
                message_type: 'success',
                message: 'Photo Added Successfully!'
            })
        }) 
        .catch(err => {
            res.json({
                message_type:'error',
                message:err.message
            })
        });
    }
}