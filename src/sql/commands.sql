--------CREATE DATABASES

create database small_online_market;
\c small_online_market

create extension pgcrypt;

---------CREATE TABLES

drop table if exists categories cascade;
create table categories(
    category_id serial primary key,
    category_name character varying(50) not null unique
);

drop table if exists products cascade;
create table products(
    product_id serial primary key,
    category_id int not null references categories(category_id) on delete cascade,
    product_name character varying(50) not null,
    product_price int not null,
    product_short_desc character varying(500) not null,
    product_long_desc character varying(1000) not null,
    product_picture character varying(500) not null
);

drop table if exists users cascade;
create table users (
    user_id serial primary key,
    user_name character varying(50) not null,
    user_password character varying not null,
    user_contact character varying(20) not null,
    user_email character varying(50) not null,
    user_role boolean default false
);

drop table if exists orders cascade;
create table orders (
    order_id serial primary key,
    user_id int not null references users(user_id) on delete cascade,
    order_time timestamptz default current_timestamp,
    products int[],
    ispaid boolean default false
);

drop table if exists korzina cascade;
create table korzina (
    order_id int not null references orders(order_id) on delete cascade,
    product_id int not null references products(product_id) on delete cascade
);


-------INSERT

insert into categories (category_name) values
('techniques'),
('clothes'),
('cars');

insert into products (
    category_id, product_name, product_price, product_short_desc, product_long_desc, product_picture
    ) values
(1, 'iphone 13 pro max', 12000000, 'This is phone', 'This is phone', './iphone.jpeg'),
(1, 'fridge', 9000000, 'This is fridge', 'This is frozen', './fridge.jpeg'),
(1, 'TV hd full', 12000000, 'This is tv', 'This is tv', './tv.jpeg'),
(3, 'Tesla', 543000000, 'This is electro car', 'This is very nice car', './car.jpeg'),
(3, 'Cobalt', 125000000, 'This is car', 'This is lux car', './cobalt.jpeg'),
(2, 'shirt', 800000, 'This is red shirt', 'This is shirt', './clothe.jpeg'),
(2, 'shoes', 499000, 'This is shoes', 'This is hot shoes', './shoes.jpeg'),
(2, 'cap', 149000, 'This is cap', 'This is summery cap', './cap.jpeg');



--------TESTING
insert into users (user_name, user_password, user_contact, user_email) values
('jakhongir', crypt('jahon2001', gen_salt('bf')), '99899 965 03 18', 'jahon@gmail.com');

insert into orders (user_id, ispaid) values (1, true);
insert into korzina values (2,1), (2,4);

select 
    o.order_id,
    o.user_id,
    json_agg(k.product_id) as products,
    o.ispaid
from orders o
left join korzina k on o.order_id = k.order_id
group by o.order_id;

delete from categories where category_id = 3;


insert into orders (user_id) values (
    select
        order.user_id
        case 
            when ispaid != false then order.user_id
        end
    from orders when order_id.user_id = 1
);






---------EDITS

--catefory

-- select  * from categories;

-- insert into categories (category_name) values ($1)
-- returning category_id, category_name;

-- update categories set category_name = $1 where category_id = $2
-- returning category_id, category_name;

-- delete from categories where category_id = $1
-- returning true;


--products

-- select * from products;

-- insert into products (
--     category_id, product_name, product_price, product_short_desc, product_long_desc, product_picture
--     ) values
-- ($1, $2, $3, $4, $5, $6);

-- delete from products where product_id = $1 returning product_picture;


--orders

-- select * from orders;


