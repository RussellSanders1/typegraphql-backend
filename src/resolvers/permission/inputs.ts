import {Field, InputType} from 'type-graphql';

@InputType({ description: 'Permission model'})
export class PermissionInput {

  // @Prop({required: true})
    @Field()
    collectionName: string;

    // @Prop({required: true, default: false})
    @Field({nullable: true, defaultValue: false})
    create: boolean;

    // @Prop({required: true, default: false})
    @Field({nullable: true, defaultValue: false})
    read: boolean;

    // @Prop({required: true, default: false})
    @Field({nullable: true, defaultValue: false})
    update: boolean;

    // @Prop({required: true, default: false})
    @Field({nullable: true, defaultValue: false})
    delete: boolean;
    
}