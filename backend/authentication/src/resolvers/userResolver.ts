import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import * as argon2 from "argon2";
import { User } from "../entities/User";

@InputType()
class RegisterUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  async user(@Arg("id", { defaultValue: 1 }) i?: number) {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id: i })
      .getOne();
    return user;
  }

  @Mutation(() => User)
  async register(@Arg("userData") newUserData: RegisterUserInput): Promise<User>{
    const userRepository = getRepository(User);
    const user = userRepository.create();
    user.userName = newUserData.username;
    user.email = newUserData.email;
    user.password = await argon2.hash(newUserData.password);
    await userRepository.save(user);
    return user;
  }
}

