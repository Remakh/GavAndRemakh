import { Field, Int, ObjectType } from "type-graphql";

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
