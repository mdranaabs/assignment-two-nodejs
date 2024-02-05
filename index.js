let http = require("http");
let fs = require('fs');
let multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, 'image' + '-' + file.originalname)
    }
});
let upload = multer({ storage: storage }).single("file");

const server = http.createServer((req,res)=>{
  if (req.url == '/') {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('This is Home Page');
  }
  
  else if (req.url == '/about') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end('This is About Page');
  } 
  
  else if (req.url == '/contact') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end('This is Contact Page');
  } 
  
  else if (req.url == '/file-write') {
      fs.writeFile('demo.txt', 'Hello World', function(error) {
          if (error) {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end('Something went Wrong');
          } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end("Hello World has been written");
          }
      });
  } 
  
  else if (req.method === 'POST' && req.url === '/uploads') {
      upload(req, res, (error) => {
          if (error) {
              console.error('Error uploading file:', error.message);
              return res.end('Error uploading file');
          } else {
            res.end('File Uploaded Successfully');
          }
      });
  }

  else{
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.end('404 Not Found!');
  }

})

const PORT = 5500;

server.listen(PORT, function() {
    console.log(`Server running at http://localhost:${PORT}`)
});