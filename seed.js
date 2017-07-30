var sql = `
	DROP TABLE IF EXISTS users;
	CREATE TABLE users(
		id SERIAL PRIMARY KEY,
		name varchar(255) UNIQUE,
		is_manager BOOLEAN null
	);
`

module.exports = {sql};