/*
 * @Author: hackrabbit
 * @Date: 2022-05-06 10:29:15
 * @LastEditors: hackrabbit
 * @LastEditTime: 2022-05-11 16:43:04
 * @Description: 
 */
const express = require('express');
const multer = require('multer');

// jwt 
const jwt = require('jsonwebtoken');
const { expressjwt: expressjwt } = require('express-jwt');

const token = jwt.sign({ foo: 'bar' }, 'secret');
console.log(token);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage });
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(expressjwt({
  secret: 'jsreacttoken',
  algorithms: ['HS256']
}).unless({
  path: ['/login', '/register']
}))

app.post('/login', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({
      success: true,
      token: jwt.sign({ username: username, password: password }, 'jsreacttoken')
    });
  } else {
    res.json({
      success: false,
      message: '用户名或密码错误'
    });
  }
})


const { select, insert, deleteData } = require('./db/index');
const req = require('express/lib/request');
// select file
app.get('/data', (req, res) => {
  console.log(req.headers)

  res.json({
    code: 1,
    data: {
      list: [
        { username: 'yly111', password: '123456' },
      ]
    }
  })
  return;
  select('select * from user', (err, results, fields) => {
    if (err) {
      res.send(err);
      return;
    }
    res.json({
      code: 1,
      data: {
        list: results,
      },
      msg: 'success'
    });
  })
})

// add file
app.post('/add', (req, res) => {
  insert(req.body, (err, results, fields) => {
    if (err) {
      res.send(err);
      return;
    }

    res.json({
      code: 1,
      msg: 'success'
    });
  })
})

// delete file
app.post('/delete', (req, res) => {
  deleteData(req.body, (err, results, fields) => {
    if (err) {
      res.send(err);
      return;
    }

    res.json({
      code: 1,
      msg: 'success'
    });
  })
})

// update file
app.post('/update', (req, res) => {

})

// update image file
app.post('/upload', (req, res) => {
  upload.single('avatar')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.json({
        code: 0,
        msg: 'upload error'
      })
    } else if (err) {
      console.log(err);
      res.json({
        code: 0,
        msg: 'upload error'
      })
    }

    res.json({
      code: 1,
      msg: 'upload success'
    })
  })
});

app.listen(3001, () => {
  console.log('Server started on port 3001,please visit http://localhost:3001');
})