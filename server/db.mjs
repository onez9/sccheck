"use strict";
import sqlite3 from 'sqlite3'
sqlite3.verbose();


class Db {
  constructor(file) {
    this.db = new sqlite3.Database(file);
    // this.createTable()
  }
  selectByEmail(email, callback) {
    return this.db.get(`SELECT * FROM users WHERE email = ?`, [email], function(err,row) {
      console.log(row)
      callback(err,row)
    })
  }
  insertAdmin(user, callback) {
    return this.db.run('INSERT INTO users (firstname,secondname,lastname,email,\'group\',pass,is_admin) VALUES (?,?,?,?)', user, (err) => {
      callback(err)
    })
  }
  selectAll(callback) {
    return this.db.all(`SELECT * FROM users`, function(err,rows){
      callback(err,rows)
    })
  }
  insert(user, callback) {
    console.log(user)
    return this.db.run('INSERT INTO users (firstname, secondname, lastname, email, \'group\', password) VALUES (?,?,?,?,?,?)', user, (err) => {
      console.log(err)
      callback(err)
    })
  }
}
// module.exports = Db
export default Db