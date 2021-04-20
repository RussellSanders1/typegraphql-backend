import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {collectionNames} from '@util/collectionNames';
import {Field, ID, ObjectType} from 'type-graphql';


@ObjectType({ description: 'Permission model'})
export class Permission {
  @Field(() => ID)
  id: string;

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
    
}

export const PermissionModel = getModelForClass(Permission);