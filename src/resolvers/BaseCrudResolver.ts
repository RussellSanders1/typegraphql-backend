import {ReturnModelType, DocumentType} from '@typegoose/typegoose';
import {BeAnObject} from '@typegoose/typegoose/lib/types';
import {GraphQLJSONObject} from 'graphql-type-json';
import {UpdateQuery} from 'mongoose';
import {InputType} from 'node:zlib';
import {Arg, Int, Mutation, Query, Resolver, ClassType, UseMiddleware, ResolverInterface} from 'type-graphql';
import {MiddlewareFn} from 'type-graphql/dist/interfaces/Middleware';
import {isAuth, Operation} from '../middleware/isAuth';

// type QueryType<T extends ClassType> = FilterQuery<DocumentType<InstanceType<T>>>;

interface IBaseResolver<T extends ClassType>{
  count: () => Promise<number>;
  
  getAll: (first: number) => Promise<T[]>;
  getByID: (id: string) => Promise<T | null>;
  
  // updateByID: (id: string, data: any) => Promise<T | null>;
  
  deleteByID: (id: string) => Promise<boolean>;
}


export function createResolver<T extends ClassType, X extends ClassType, Y extends ClassType>(
  collectionName: string,
  returnType: T,
  model: ReturnModelType<T, BeAnObject>,
  createInputType: X,
  updateInputType: Y,
  middleware?: MiddlewareFn<any>[]
) {
  @Resolver({isAbstract: true})
  abstract class BaseResolver implements IBaseResolver<T> {

    @Mutation(() => returnType, {name: `create${collectionName}`})
    @UseMiddleware(...(middleware || []), isAuth(collectionName, [Operation.Create]))
    async create(@Arg('data', () => createInputType) data: any){
      return model.create(data);
    }
  
    @Query(() => [returnType], { name: `getAll${collectionName}s` })
    @UseMiddleware(...(middleware || []),isAuth(collectionName, [Operation.Read]))
    async getAll(
        @Arg('first', () => Int) first: number,
    ): Promise<T[]> {
      return (await model.find()).slice(0,first); 
    }

    @Query(() => returnType, { name: `getAll${collectionName}s` })
    @UseMiddleware(...(middleware || []),isAuth(collectionName, [Operation.Read]))
    async getByID(
        @Arg('first') id: string,
    ): Promise<T | null> { 
      return (await model.findById(id));
    }

    @Query(() => Int, {name: `count${collectionName}`})
    @UseMiddleware(...(middleware || []),isAuth(collectionName, [Operation.Read]))
    async count(){
      return model.count({});
    }

    @Mutation(() => Boolean, {name: `delete${collectionName}ByID`})
    @UseMiddleware(...(middleware || []),isAuth(collectionName, [Operation.Delete]))
    async deleteByID(@Arg('id') id: string): Promise<boolean> {
      await model.findByIdAndDelete(id);
      return true;
    }

    @Mutation(() => returnType, {name: `update${collectionName}ByID`})
    @UseMiddleware(...(middleware || []),isAuth(collectionName,[Operation.Update]))
    async updateByID(
      @Arg('id') id: string,
      @Arg('data', () => updateInputType) data: UpdateQuery<DocumentType<InstanceType<T>>>
    ): Promise<T| null> {
      return model.findByIdAndUpdate(id, data);
    }


  }
  
  return BaseResolver;
}
  