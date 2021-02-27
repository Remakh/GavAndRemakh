import { Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

@Resolver()
export class UserResolver {
  @Query(() => User)
  user() {
    const user = new User();
    user.email = "Test Email";
    user.id = 123;  
    user.password = "Password";
    user.userName = "Username";
    return user;
  }
}
