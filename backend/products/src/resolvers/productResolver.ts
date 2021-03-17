import { Query, Resolver } from "type-graphql";

@Resolver()
export class ProductResolver {
  @Query(() => String)
  async currentUser(): Promise<string> {
    return "history";
  }
}
