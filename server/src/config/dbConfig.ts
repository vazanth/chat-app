import { PoolConfig }from 'mysql';

const dbConfig: PoolConfig = {
  "user": "root",
  "password": "Geronimo@6794",
  "host": "localhost",
  "database": "chat-ql",
  "connectionLimit": 10,
  "connectTimeout": 120000
}

export default dbConfig