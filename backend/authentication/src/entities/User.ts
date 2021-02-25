import { Field, Int, ObjectType } from "type-graphql";
import { Entity } from "typeorm";

@Entity()
@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  userName: string;

  password: string;

  @Field(() => String)
  email: string;
}
