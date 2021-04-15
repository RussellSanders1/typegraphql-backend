import {ApolloServer} from 'apollo-server-express';
import Express from 'express';
import mongoose from 'mongoose';
import 'reflect-metadata';
import {UserResolver} from './resolvers/user/UserCrud';
import {LoginResolver} from './resolvers/user/Login';
import {RegisterResolver} from './resolvers/user/Register';
import {buildSchema} from 'type-graphql';
import session from 'express-session';
import connectRedis from 'connect-redis';
import {redis} from './redis';
import cors from 'cors';
import {MeResolver} from './resolvers/user/Me';
import {generateRoles} from './util/generateRoles';
import {RoleResolver} from './resolvers/role/RoleCrud';
import {createSchema} from './util/createSchema';
import {generateAdmin} from './util/generateAdminAccount';
import dotenv from 'dotenv';

const main = async () => {
  const env = dotenv.config();
  if(env.error){
    throw new Error('problem setting up environment variables');
  }
  const schema = await createSchema();
  
  
  const server = new ApolloServer({
    schema,
    context: ({req,res}) => ({req,res}) 
  });
  const app = Express();
  const RedisStore = connectRedis(session);
  
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000'
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis
      }),
      name: 'qid',
      secret: process.env.SECRET_KEY!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  server.applyMiddleware({app});
  
  mongoose.connect(process.env.MONGODB!, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
      console.log('connectedToDB');
      return app.listen({port: 4000});
    }).then(async () => {
      await generateRoles();
      await generateAdmin();
    });
};

main().catch((e) => {
  console.log({e});
});