const SELECT = `
select  * from categories;
`

const INSERT = `
insert into categories (category_name) values ($1)
returning category_id, category_name;
`

const UPDATE = `
update categories set category_name = $1 where category_id = $2
returning category_id, category_name;
`

const DELETE = `
delete from categories where category_id = $1
returning true;
`

export default {
    SELECT,
    INSERT,
    UPDATE,
    DELETE
}