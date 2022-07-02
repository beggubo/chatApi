const sharp = require("sharp");
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/imagenes/trash')
    },
    filename: function (req, file, cb) {  
      cb(null, file.originalname)
    }
  })

  var upload = multer({ storage: storage }).single('file')

const register = (req, res) =>{
  
  return new Promise((resolve, reject) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        resolve(err)
        console.log(err)
      } else if (err) {
        console.log(err)
        resolve(err)
      }
      sharp(req.file.path).resize({ height: 300 }).toFile('./public/imagenes/' + req.file.filename);              
      resolve(req.file)
    })
  })
}  

class fileService {

  static add(req, res) {     
    register(req, res)
      .then((result) => {
        res.status(200).send({ result })
      })
      .catch(reason => {       
        res.status(400).send({ 'message': reason })
    })   
  }	

     
}

export default fileService;

