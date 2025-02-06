import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

export type Context = {
  req: NextRequest;
  prisma: PrismaClient;
};

export type ResolverFn<Parent = any, Args = any, Result = any> = (
  parent: Parent,
  args: Args,
  context: Context
) => Promise<Result> | Result;
