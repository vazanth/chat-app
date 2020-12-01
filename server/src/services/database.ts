import dbConfig from '../config/dbConfig';
import { createPool, Pool, PoolConnection, Query } from 'mysql';

import { I_Mysql } from '../interfaces';

let pool: Pool;

//initialize database
export const initDatabase = async () => {
  let conn: PoolConnection | null = null;
  try {
    pool = createPool(dbConfig);
    conn = await getConnection();
    let result: Query = await conn.query("SELECT 'success'");
    return result
  } catch (error) {
    throw error;
  } finally {
    conn?.release();
  }
}

const getConnection = (): Promise<PoolConnection> => {
  return new Promise((resolve, reject)=> {
    pool.getConnection((err, conn)=>{
      if(err){
        reject(err);
      }else{
        resolve(conn);
      }
    })
  })
}

// Closing the database
export const closeDataBase = () => {
  if (pool) pool.end();
};

export const queryExecute = (query: I_Mysql): Promise<any> => {
  console.log('query', query)
  return new Promise(async (resolve, reject)=> {
    let conn: PoolConnection | null = null;
    try {
      conn = await getConnection();
      await conn.query({
        sql: query.sql,
        values: query.values
      },(err, result)=>{
        if(err) reject(err);
        resolve(result)
      })
    } catch (error) {
      reject(error)
    } finally  {
      conn?.release();
    }
  })
}