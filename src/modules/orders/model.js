const SELECT = `
select 
    o.order_id,
    o.user_id,
    o.order_time,
    json_agg(k.product_id) as products,
    o.ispaid
from orders o
left join korzina k on o.order_id = k.order_id
group by o.order_id;
`

const INSERTORDERPRODUCT = `
insert into korzina values ($1, $2)
returning order_id, product_id;
`

const DELETE = `
delete from orders where order_id = $1 and ispaid = false and user_id = $2 returning true;
`

const DELETEORDERPRODUCT = `
delete from korzina where order_id = $1 and product_id = $2 returning true;
`

const INSERTORDER = `
insert into orders (user_id) values ($1) 
returning order_id, user_id, order_time, products, ispaid;
`

const USER = `
select 
    *
from users where user_id = $1 and user_name = $2 and user_role = false;
`

const OWNORDER = `
SELECT
    *
FROM orders
WHERE
CASE
	WHEN $1 > 0 THEN order_id = $1
	ELSE TRUE
END AND user_id = $2 and ispaid: false;
`

const PAYORDER = `
update orders set ispaid = true where order_id = $1 returning "Order paid";
`

export default {
    USER,
    SELECT,
    DELETE,
    OWNORDER,
    PAYORDER,
    INSERTORDER,
    DELETEORDERPRODUCT,
    INSERTORDERPRODUCT
}