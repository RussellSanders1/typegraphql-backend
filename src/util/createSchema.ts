import {buildSchema} from 'type-graphql';
import {RoleResolver} from '../resolvers/role/RoleCrud';
import {LoginResolver} from '../resolvers/user/Login';
import {MeResolver} from '../resolvers/user/Me';
import {RegisterResolver} from '../resolvers/user/Register';
import {UserResolver} from '../resolvers/user/UserCrud';
import {UpdateRoleResolver} from '../resolvers/user/UpdateRole';
import {GraphQLSchema} from 'graphql';

export const createSchema = async () => {
  return buildSchema({
    resolvers: [MeResolver, UserResolver, LoginResolver, RegisterResolver, RoleResolver, UpdateRoleResolver],
    emitSchemaFile: true,
    validate: true,
    dateScalarMode: 'timestamp'
  });
};