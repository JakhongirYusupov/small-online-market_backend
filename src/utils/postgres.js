import pg from 'pg'

const pool = new pg.Pool({
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	port: process.env.PORT,
	host: process.env.HOST
})


async function model(query, ...params) {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(query, params.length ? params : null)
		return rows
	} catch (error) {
		throw error
	} finally {
		client.release()
	}
}

export default model