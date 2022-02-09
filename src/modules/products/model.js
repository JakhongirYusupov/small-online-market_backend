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

export default {
    SELECT,
    INSERT,
    // UPDATE,
    DELETE
}