import { ResolverFn } from '@/graphql/types';
import {
  createGuestSchema,
  updateGuestSchema,
  deleteGuestSchema,
} from '@/graphql/validation-schemas/guestSchemas';

export const createGuest: ResolverFn<null, any, any> = async (
  _,
  args,
  { prisma }
) => {
  const data = createGuestSchema.parse(args);
  return await prisma.guests.create({ data });
};

export const updateGuest: ResolverFn<null, any, any> = async (
  _,
  args,
  { prisma }
) => {
  const { id, name, email } = updateGuestSchema.parse(args);
  return await prisma.guests.update({
    where: { id },
    data: { name, email },
  });
};

export const deleteGuest: ResolverFn<null, { id: string }, any> = async (
  _,
  args,
  { prisma }
) => {
  const { id } = deleteGuestSchema.parse(args);
  return await prisma.guests.delete({ where: { id } });
};
