import { Field, Float, InputType, Query, Resolver } from "type-graphql";

@InputType()
class NewProduct {
  @Field(() => String)
  productName: string;

  @Field(() => Float)
  productPrice: string;
}

@Resolver()
export class ProductResolver {
  @Query(() => String)
  async currentUser(): Promise<string> {
    return "history";
  }
}
