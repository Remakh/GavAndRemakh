import { Arg, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";

@Resolver()
export class UserResolver {
  @Query(() => User)
  async user(@Arg("id", { defaultValue: 1 }) i ?: number) 
    {
    const user = await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.id = :id", { id: i })
    .getOne();
    return user;
  }
}
