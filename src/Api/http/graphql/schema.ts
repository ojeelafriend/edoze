import { typeDefs as tdBuyer } from "./buyer/typeDefs";
import { typeDefs as tdProduct } from "./product/typeDefs";

import { resolvers as rsBuyer } from "./buyer/resolvers";
import { resolvers as rsProduct } from "./product/resolvers";

export const typeDefs = [tdProduct, tdBuyer];
export const resolvers = [rsProduct, rsBuyer];
