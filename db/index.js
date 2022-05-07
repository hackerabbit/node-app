/*
 * @Author: hackrabbit
 * @Date: 2022-05-06 10:31:53
 * @LastEditors: hackrabbit
 * @LastEditTime: 2022-05-07 14:30:51
 * @Description: 
 */
const config = require('./config');
const mysql = require("mysql");
const connection = mysql.createConnection(config);

function query(sql, callback) {
  connection.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(null, results, fields);
  })
}



function select(sql, callback) {
  query('select * from user', (err, results, fields) => {
    if (err) {
      console.log(err);
      callback(err);
      return;
    }
    callback(null, results, fields);
  })
}


function insert(data, callback) {
  let { username, password } = data;
  let sql = `insert into user (username, password) values ('${username}', '${password}')`;
  query(sql, (err, results, fields) => {
    if (err) {
      console.log(err);
      callback(err);
      return;
    }
    callback(null, results, fields);
  })
}

function deleteData(data, callback) {
  let { id } = data;
  let sql = `delete from user where id = ${id}`;
  query(sql, (err, results, fields) => {
    if (err) {
      console.log(err);
      callback(err);
      return;
    }
    callback(null, results, fields);
  })
}

module.exports = {
  select,
  insert,
  deleteData
}