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
from users where user_id = $1 and user_name = $2;
`


const LOGIN = `
select 
    * 
from users where user_name = $1 and user_password = crypt($2, user_password)
`

const STATISTICS = `
select * from orders;
`


export default {
    STATISTICS,
    USERADMIN,
    LOGIN,
    ADMIN,
    USER
}