import {ApolloServer} from 'apollo-server-express';
import {MONGODB} from 'config';
import Express from 'express';
import mongoose from 'mongoose';
import 'reflect-metadata';
import {UserResolver} from 'resolvers/user/user';
import {buildSchema} from 'type-graphql';
 
const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: false,
    dateScalarMode: 'timestamp'
  });
  
  
  const server = new ApolloServer({schema});
  const app = Express();
  server.applyMiddleware({app});
  
  mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
      console.log('connectedToDB');
      return app.listen({port: 1338});
    });
};

main().catch((e) => {
  console.log({e});
});