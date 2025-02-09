import { ResolverFn } from '@/graphql/types';
import {
  getGuestByIdSchema,
  getGuestsSchema,
} from '@/graphql/validation-schemas/guest-schemas';

export const getGuestById: ResolverFn<
  null,
  { id: string },
  any | null
> = async (_, args, { prisma }) => {
  const { id } = getGuestByIdSchema.parse(args);
  return await prisma.guests.findUnique({
    where: { id },
    include: { chat_sessions: true },
  });
};

export const getGuests: ResolverFn<null, {}, any[]> = async (
  _,
  args,
  { prisma }
) => {
  getGuestsSchema.parse(args);
  return await prisma.guests.findMany({
    include: { chat_sessions: true },
  });
};
