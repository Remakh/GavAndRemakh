import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getRepository } from "typeorm";
import * as argon2 from "argon2";
import { User } from "../entities/User";
import { ContextType } from "src/types";
import { COOKIE_NAME } from "../consts/consts";

@InputType()
class RegisterUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@InputType()
class LoginUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}

@Resolver()
export class UserResolver {
  @Query(() => UserResponse)
  async currentUser(@Ctx() { req }: ContextType): Promise<UserResponse> {
    if (!req.session.userId) {
      return { success: false, message: "Not login in" };
    }
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id: req.session.userId })
      .getOne();

    return { success: true, user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("userData", { nullable: false }) userData: LoginUserInput,
    @Ctx() { req }: ContextType
  ): Promise<UserResponse> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { userName: userData.username },
    });

    if (!user) {
      return {
        success: false,
        message: "User not registered",
      };
    }
    const validUser = await argon2.verify(user.password, userData.password);

    if (!validUser) {
      return {
        success: false,
        message: "Username or password is incorrect",
      };
    }

    req.session.userId = user.id;

    return { user, success: true };
  }

  @Mutation(() => User)
  async register(
    @Arg("userData") newUserData: RegisterUserInput
  ): Promise<User> {
    const userRepository = getRepository(User);
    const user = userRepository.create();
    user.userName = newUserData.username;
    user.email = newUserData.email;
    user.password = await argon2.hash(newUserData.password);
    await userRepository.save(user);
    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: ContextType): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);

        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }

  @Query(() => Int)
  tquery(@Ctx() { req }: ContextType) {
    if (!req.session.test) {
      req.session.test = 1;
      console.log("No test");
    } else {
      req.session.test += 1;
    }

    return req.session.test;
  }
}
