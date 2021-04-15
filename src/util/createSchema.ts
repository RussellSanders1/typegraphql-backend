import {buildSchema} from 'type-graphql';
import {RoleResolver} from '../resolvers/role/RoleCrud';
import {LoginResolver} from '../resolvers/user/Login';
import {MeResolver} from '../resolvers/user/Me';
import {RegisterResolver} from '../resolvers/user/Register';
import {UserResolver} from '../resolvers/user/UserCrud';
import {UpdateUserRoleResolver} from '../resolvers/user/UpdateRole';

export const createSchema = async () => {
  return buildSchema({
    resolvers: [
      MeResolver, 
      UserResolver,
      LoginResolver,
      RegisterResolver,
      UpdateUserRoleResolver,
      RoleResolver,
    ],
    emitSchemaFile: true,
    validate: true,
    dateScalarMode: 'timestamp'
  });
};