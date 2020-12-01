import { ApolloServer } from 'apollo-server';
import express, { Express } from 'express';
import cors from 'cors';
import { Server } from 'http';

import { port } from '../config/server';
import { resolvers, typeDefs } from "../graphql";

let http: Server;

export const initServer = async() => {
  return new Promise((resolve, reject)=> {
    let app: Express = express();
    app.use(cors());

    let apollo = new ApolloServer({
      cors: true,
      typeDefs,
      resolvers,
      context: (context: any) => {
        return {token: context.req.headers.authorization}
      }
    });
    apollo.listen(port).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
      resolve();
    }).catch((err)=> {
      console.log(err);
      reject(err);
    });
    // http = app.listen(port, ()=>{
    //   console.log(`Server Started on Port ${port}`)
    //   resolve();
    // }).on("error", (err) =>{
    //   console.log(err);
    //   reject(err);
    // })
  })
}

export const closeServer = () => {
  return new Promise((resolve, reject) => {
    http.close(err => {
      if(err){
        reject();
      }else{
        resolve();
      }
    })
  })
}