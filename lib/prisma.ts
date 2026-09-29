

import { PrismaClient as BasePrismaClient } from "../app/generated/prisma/client"; 
import { PrismaPg } from "@prisma/adapter-pg"; 

const PrismaClientConstructor = BasePrismaClient as unknown as new (options?: any) => typeof BasePrismaClient;

const globalForPrisma = global as unknown as {
  prisma: any; 
}; 

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!, 
}); 


const prisma =
  globalForPrisma.prisma ||
  new (BasePrismaClient as any)({
    adapter, 
  }); 

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 

export default prisma;
