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
delete from orders where order_id = $1 and ispaid = false returning true;
`

const DELETEORDERPRODUCT = `
delete from korzina where order_id = $1 and product_id = $2 returning true;
`

const INSERTORDER = `
insert into orders (user_id) values ($1) 
returning order_id, user_id, order_time, products, ispaid;
`

export default {
    SELECT,
    DELETE,
    INSERTORDER,
    DELETEORDERPRODUCT,
    INSERTORDERPRODUCT
}