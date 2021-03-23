import { Product } from "../entities/Product";
import {
  Arg,
  Field,
  FieldResolver,
  Float,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { ProductImages } from "../entities/ProjectImage";

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

@Resolver(() => Product)
export class ProductResolver {
  @FieldResolver(() => [ProductImages])
  async images(@Root() product: Product) {
    const images = await ProductImages.find({ where: { product: product } });
    return images;
  }

  @Query(() => Product)
  async product(
    @Arg("productId", () => Int, { nullable: false }) productId: number
  ): Promise<Product | null> {
    const product = await Product.findOne(productId);

    if (!product) {
      return null;
    }

    return product;
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
