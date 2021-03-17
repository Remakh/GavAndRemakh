import { Product } from "../entities/Product";
import {
  Arg,
  Field,
  Float,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class NewProduct {
  @Field(() => String)
  productName: string;

  @Field(() => Float)
  productPrice: number;

  @Field(() => String)
  productDescription: string;
}

@ObjectType()
class ProductErrors {
  @Field(() => String)
  type: string;

  @Field(() => String)
  message?: string;
}

@ObjectType()
class ProductResponse {
  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => [ProductErrors], { nullable: true })
  errors?: ProductErrors[];
}

@Resolver()
export class ProductResolver {
  @Query(() => String)
  async currentUser(): Promise<string> {
    return "history";
  }

  @Mutation(() => ProductResponse)
  async addProduct(
    @Arg("productData", { nullable: false }) productData: NewProduct
  ): Promise<ProductResponse> {
    const product = await Product.create();
    product.name = productData.productName;
    product.price = productData.productPrice;
    product.description = productData.productDescription;

    await Product.save(product);
    return { product };
  }
}
