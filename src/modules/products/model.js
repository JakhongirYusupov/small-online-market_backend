const SELECT = `
select  * from products;
`

const INSERT = `
insert into products (
    category_id, product_name, product_price, product_short_desc, product_long_desc, product_picture
    ) values
($1, $2, $3, $4, $5, $6)
returning product_id, category_id, product_name, product_price, product_short_desc, product_long_desc, product_picture;
`

const DELETE = `
delete from products where product_id = $1 returning product_picture;
`

const UPDATE = `
update products p set 
category_id = (
    case when $1 > 0 then $1 else p.category_id end
), 
product_name = (
    case when length($2) > 0 then $2 else p.product_name end
),
product_price = (
    case when $3 > 0 then $3 else p.product_price end
),
product_short_desc = (
    case when length($4) > 0 then $4 else p.product_short_desc end
),
product_long_desc = (
    case when length($5) > 0 then $5 else p.product_long_desc end
),
product_picture = (
    case when length($6) > 0 then $6 else p.product_picture end
)   
where p.product_id = $7 returning *;
`

const GETPRODUCTIMAGE = `
select 
    product_picture
from products where product_id = $1
`

const SEARCH = `
select 
    * 
from products where
case
    when length($1) > 0 then (
    	product_name ilike concat('%', $1, '%')
    ) else true
end;
`

const USERADMIN = `
select 
    user_id,
    user_name,
    user_contact,
    user_email
from users where user_id = $1 and user_name = $2 and user_role = true;
`


export default {
    GETPRODUCTIMAGE,
    USERADMIN,
    SEARCH,
    SELECT,
    INSERT,
    UPDATE,
    DELETE
}