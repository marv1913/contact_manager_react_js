create table users(username varchar primary key, password varchar, isadmin bool);
create table contacts(forename varchar, name varchar, street varchar, postId int, town varchar, country varchar, id int primary key, isprivate bool, latitude varchar, longitude varchar);
insert into contacts values ('marvin', 'rausch', 'example street', 13155, 'Berlin', 'germany', 1, 'True', '52.520007','13.404954');
insert into users values ('admin', 'admin', 'True');
