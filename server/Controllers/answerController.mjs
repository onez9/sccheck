import express from 'express';
const router = express.Router();
import sqlite3 from 'sqlite3'
const db_path = "./curs_summer.db"
const urlencodedParser = express.urlencoded({extended: true})




router.post('/get_my_ended_cources', urlencodedParser, (req,res)=>{
  let db = new sqlite3.Database(db_path, (err) => {
    if(err) console.log(err)
  })
  let stmt = db.prepare(`select * from (select id as gid,user_id as uid,cource_id,grade,transit_time from grades) as t1
  left join cources on cources.id=t1.cource_id 
  where uid=?`)
  stmt.all([req.session.user_id], (err, rows)=>{
    console.log(rows.length)
    stmt.finalize()
    res.json(rows)
  })
})

// /answer/add - добавление ответов - тип мы прошли уже
router.post('/add', urlencodedParser, (req,res)=>{

  req.session.endTime = new Date().getTime()


  console.log('hello from answer/add: ', req.body)
  let answers = req.body.answers


  let db = new sqlite3.Database(db_path, (err) => {
    if(err) console.log(err)
  })
  let sum_point = 0
  let stmt = db.prepare('insert into answers (task_id,user_id,answer) values (?,?,?)')

  // item.user_id необязательно передавать это, ведь мы уже вошли в систему как пользователь, стало быть нам изестно кто мы
  let user_id=req.session.user_id
  let cource_id=req.body.cource_id

  console.log('тут у нас что приходит на сервер когда нажимаем завершить выполнение: ' )
  console.log(cource_id, ' это коурс id.')
  for (let item of answers) {
    console.log(item)
    if (item.answer==item.answer_of_user) {
      sum_point++
    }
    stmt.run([item.task_id, user_id, item.answer_of_user], (err,rows)=>{
      if (err) res.send(err)
      console.log(rows)
    })
  }
  console.log('start time: ', req.session.startTime)
  console.log('end time: ', req.session.endTime)
  console.log('Типо время за которое мы решили все задачки: ', (parseInt(req.session.endTime) - parseInt(req.session.startTime)))
  let grade = (sum_point / req.body.answers.length)*100
  let transit_time = ((req.session.endTime) - (req.session.startTime))
  let seconds = Math.floor(transit_time/1000).toString()
  if (seconds.length==1) {
    seconds = '0'+seconds % 60
  }
  let minuts = Math.floor(seconds/60).toString()
  if (minuts.length==1) {
    minuts= '0'+minuts % 60
  }
  let hours = Math.floor(minuts / 60).toString()
  if (hours.length==1) {
    hours = '0'+hours%12
  }
  let s_time = `${hours}:${minuts}:${seconds}`
  console.log(s_time)
  stmt = db.prepare('insert into grades (user_id,cource_id,grade,transit_time) values (?,?,?,?)')
  stmt.run([user_id, cource_id, grade, s_time], (err)=>{
    console.log(err)

  })
  stmt.finalize()
  res.json({grade: grade})

})


export default router