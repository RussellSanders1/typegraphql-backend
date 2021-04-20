import { Resolver} from 'type-graphql';
import {User, UserModel} from '../../models/User';
import {createResolver} from '../BaseCrudResolver';
import {RegisterInput, UpdateUserDataInput} from './inputs';

const UserCrudResolver = createResolver('User',User,UserModel, RegisterInput, UpdateUserDataInput, []);

@Resolver(() => User)
export class UserResolver extends UserCrudResolver {}