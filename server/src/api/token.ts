import { AuthenticationError }from 'apollo-server';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/server';


export const token_api = (header: string) => {
  if(header){
    let token = header.split('Bearer ').pop();
    if(token){
      try {
        const user = verify(token, SECRET_KEY);
        return user
      } catch (error) {
        throw new AuthenticationError('Invalid Token');
      }
    }
    throw 'Authentication not available';
  }
  throw 'Authentication not available';
}