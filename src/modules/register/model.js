const REGISTER = `
insert into users (user_name, user_password, user_contact, user_email) values
($1, crypt($2, gen_salt('bf')), $3, $4)
returning user_id, user_name, user_contact, user_email;
`
const USER = `
select 
    *
from users where user_id = $1 and user_name = $2
`

export default {
    REGISTER,
    USER
}