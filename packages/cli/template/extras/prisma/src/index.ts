import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";

if (!process.env.DATABASE_URL) {
	throw new Error("Missing DATABASE_URL");
}

const connectionString = `${process.env.DATABASE_URL}`;

const createPrismaClient = () => {
	const adapter = new PrismaPg({ connectionString });
	const prisma = new PrismaClient({ adapter });
	return prisma;
};

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

export * from "../generated/client";

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
