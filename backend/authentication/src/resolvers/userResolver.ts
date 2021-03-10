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
class UserErrors {
  @Field(() => String)
  type: string;

  @Field(() => String)
  message?: string;
}

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [UserErrors], { nullable: true })
  errors?: UserErrors[];
}

@Resolver()
export class UserResolver {
  @Query(() => UserResponse)
  async currentUser(@Ctx() { req }: ContextType): Promise<UserResponse> {
    if (!req.session.userId) {
      return { errors: [{ type: "user", message: "User not logged in" }] };
    }
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id: req.session.userId })
      .getOne();

    return { user };
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
        errors: [
          { type: "password", message: "Username or password is incorrect" },
        ],
      };
    }
    const validUser = await argon2.verify(user.password, userData.password);

    if (!validUser) {
      return {
        errors: [
          { type: "password", message: "Username or password is incorrect" },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("userData") newUserData: RegisterUserInput
  ): Promise<UserResponse> {
    const userRepository = getRepository(User);

    //Username checks
    let existingUser = await userRepository.findOne({
      where: { userName: newUserData.username },
    });

    if (existingUser) {
      return { errors: [{ type: "username", message: "Username taken" }] };
    }

    //Email checks

    if (!newUserData.email.includes("@")) {
      return { errors: [{ type: "email", message: "Invalid email" }] };
    }

    existingUser = await userRepository.findOne({
      where: { email: newUserData.email },
    });

    if (existingUser) {
      return {
        errors: [
          {
            type: "email",
            message: "An account has already been made using this email",
          },
        ],
      };
    }

    //Password checks
    if (newUserData.password.length < 3) {
      return {
        errors: [
          {
            type: "password",
            message: "Password must be at least 3 characters long",
          },
        ],
      };
    }

    const user = userRepository.create();
    user.userName = newUserData.username;
    user.email = newUserData.email;
    user.password = await argon2.hash(newUserData.password);
    await userRepository.save(user);
    return { user };
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
