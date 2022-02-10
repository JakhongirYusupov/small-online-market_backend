const USER = `
select 
    *
from users where user_id = $1 and user_name = $2
`

const ADMIN = `
select 
    *
from users where user_name = $1 and user_password = crypt($2, user_password) and user_role = true
`


const LOGIN = `
select 
    * 
from users where user_name = $1 and user_password = crypt($2, user_password)
`

export default {
    LOGIN,
    ADMIN,
    USER
}