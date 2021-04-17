import {MyContext} from '../../contexts/MyContext';
import {Resolver, Query, Ctx} from 'type-graphql';
import {User, UserModel} from '../../models/User';

@Resolver()
export class MeResolver {
  @Query(() => User, {nullable: true})
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    if(!ctx.req.session.userID){
      return null;
    }
        
    return UserModel.findById(ctx.req.session.userID);
  }
}