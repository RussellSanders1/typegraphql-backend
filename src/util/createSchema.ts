import {buildSchema} from 'type-graphql';
import {RoleResolver} from '@resolvers/role/RoleCrud';
import {LoginResolver} from '@resolvers/user/Login';
import {MeResolver} from '@resolvers/user/Me';
import {RegisterResolver} from '@resolvers/user/Register';
import {UserResolver} from '@resolvers/user/UserCrud';
import {UpdateUserRoleResolver} from '@resolvers/user/UpdateRole';
import {LogoutResolver} from '@resolvers/user/Logout';

export const createSchema = async () => {
  return buildSchema({
    resolvers: [
      MeResolver, 
      UserResolver,
      LoginResolver,
      RegisterResolver,
      UpdateUserRoleResolver,
      RoleResolver,
      LogoutResolver
    ],
    emitSchemaFile: true,
    validate: true,
    dateScalarMode: 'timestamp'
  });
};