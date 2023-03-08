// declaration
const expres = require('express')
const routes = expres.Router()
const multer = require('multer');
// controllers
const photo = require('../../controllers/Photos/photo.js');
//routes.post('/AddPhoto', photoValidation, photo.AddPhoto);
//routes.get('/LoadPhotos', photo.LoadPhotos);
routes.post('/AddVote/:id', photo.AddVote);
routes.get('/LoadPhoto', photo.LoadPhoto);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, `image-${Date.now()}.${file.originalname}`)
    },
  })
  
// img filter
const isImage = (req,file,callback)=>{
  if(file.mimetype.startsWith("image")){
      callback(null,true)
  }else{
      callback(null,Error("only image is allowd"))
  }
}

const upload = multer({ storage: storage, fileFilter:isImage })
routes.post('/AddPhoto', upload.single('file'), photo.AddPhoto)
routes.get('/Count/:id', photo.Count);
module.exports = routes