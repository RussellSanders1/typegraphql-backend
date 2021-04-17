import {Mutation, UseMiddleware, Arg, Resolver, FieldResolver, Root, ResolverInterface} from 'type-graphql';
import {isAuth, Operation} from '../../middleware/isAuth';
import {Role, RoleModel} from '../../models/Role';
import {User, UserModel} from '../../models/User';
import {createResolver} from '../BaseCrudResolver';
import {RegisterInput, UpdateUserDataInput} from './inputs';

const UserCrudResolver = createResolver('User',User,UserModel, RegisterInput, UpdateUserDataInput, []);

@Resolver(() => User)
export class UserResolver extends UserCrudResolver {}