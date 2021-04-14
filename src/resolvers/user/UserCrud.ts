import {Mutation, UseMiddleware, Arg, Resolver, FieldResolver, Root} from 'type-graphql';
import {isAuth, Operation} from '../../middleware/isAuth';
import {Role, RoleModel} from '../../models/Role';
import {User, UserModel} from '../../models/User';
import {createResolver} from '../BaseCrudResolver';
import {RegisterInput, UpdateUserDataInput} from './inputs';

const UserCrudResolver = createResolver('User',User,UserModel, RegisterInput);

@Resolver(() => User)
export class UserResolver extends UserCrudResolver {
  @Mutation(() => User, {name: 'updateUserByID'})
  @UseMiddleware(isAuth('User', [Operation.Update]))
  async updateByID(
        @Arg('id') id: string,
        @Arg('data', () => UpdateUserDataInput) data: any
  ): Promise<User| null> {
    return await UserModel.findByIdAndUpdate(id, data);
  }
}