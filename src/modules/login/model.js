const USER = `
select 
    *
from users where user_id = $1 and user_name = $2 and user_role = false;
`

const ADMIN = `
select 
    user_id,
    user_name,
    user_contact,
    user_email
from users where user_name = $1 and user_password = crypt($2, user_password);
`

const USERADMIN = `
select 
    user_id,
    user_name,
    user_contact,
    user_email
from users where user_id = $1 and user_name = $2 and user_role = true;
`


const LOGIN = `
select 
    * 
from users where user_name = $1 and user_password = crypt($2, user_password)
`


const TotalSummaPaid = `
select
    o.ispaid,
    sum(p.product_price) as TotalSumma
from korzina k 
left join orders o on k.order_id = o.order_id
left join products p on k.product_id = p.product_id
where o.ispaid = true
group by o.ispaid;
`

const TotalSummaIsPaid = `
select
    o.ispaid,
    sum(p.product_price) as TotalSumma
from korzina k 
left join orders o on k.order_id = o.order_id
left join products p on k.product_id = p.product_id
where o.ispaid = false
group by o.ispaid;
`

const MOSTSOLDPRODUCT = `
select
    p.product_id,
    p.product_name,
    count(k.product_id)
from korzina k 
left join orders o on k.order_id = o.order_id
left join products p on k.product_id = p.product_id
where o.ispaid = true
group by p.product_id
order by count DESC limit 1;
`

const LEASTSOLDPRODUCT = `
select
    p.product_id,
    p.product_name,
    count(k.product_id)
from korzina k 
left join orders o on k.order_id = o.order_id
left join products p on k.product_id = p.product_id
where o.ispaid = true
group by p.product_id
order by count limit 1;
`


export default {
    TotalSummaIsPaid,
    LEASTSOLDPRODUCT,
    MOSTSOLDPRODUCT,
    TotalSummaPaid,
    USERADMIN,
    LOGIN,
    ADMIN,
    USER
}