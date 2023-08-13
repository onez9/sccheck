

select * from grades;
select * from users;

select * from answers;
select * from tasks where cource_id = 10;
select * from cources;
select * from users_cources;

-- посмотреть все задачи курса
select * from tasks where tasks.cource_id=11;

-- все ответы на задачи которые были решены кем либо, в рамках заданного курса
select tasks.ntask as 'Название задачи', 
tasks.answer_task as 'Правильный ответ', 
answers.answer as 'Ответ пользователя', 
(users.lastname ||' '||users.firstname ||' '||users.secondname) as 'ФИО',
users.id, answers.user_id
from tasks 
inner join answers on tasks.id=answers.task_id
left join users on users.id=answers.user_id
where tasks.cource_id=15;

-- запрос для получения пользователей, которые прошли тест и оценок за прохождение
select distinct 
(users.lastname ||' '||users.firstname ||' '||users.secondname) as 'ФИО',
users.id, answers.user_id,
grades.grade
from tasks 
inner join answers on tasks.id=answers.task_id
inner join users on users.id=answers.user_id
inner join grades on grades.user_id=users.id
where tasks.cource_id=10;

-- показывает всех пользователей их курсы и оценки за прохождение этих курсов
select * from users 
left join cources on users.id=cources.user_id
left join grades on users.id=grades.user_id
where users.id=1;

