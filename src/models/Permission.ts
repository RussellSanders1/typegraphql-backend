import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {collectionNames} from '@util/collectionNames';
import {Field, ObjectType} from 'type-graphql';


@ObjectType({ description: 'Permission model'})
export class Permission {

  @Prop({required: true, enum: collectionNames})
  @Field()
  collectionName: string;

  @Prop({required: true, default: false})
  @Field({defaultValue: false})
  create: boolean;

  @Prop({required: true, default: false})
  @Field({defaultValue: false})
  read: boolean;

  @Prop({required: true, default: false})
  @Field({defaultValue: false})
  update: boolean;

  @Prop({required: true, default: false}) 
  @Field({defaultValue: false})
  delete: boolean;
    
  // constructor(collectionName: string, create: boolean, read: boolean, update: boolean, del: boolean,){
  //   this.collectionName = collectionName;
  //   this.create = create;
  //   this.read = read;
  //   this.update = update;
  //   this.delete = del;
  // }
}

export const PermissionModel = getModelForClass(Permission);