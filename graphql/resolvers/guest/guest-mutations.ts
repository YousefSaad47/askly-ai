import { ResolverFn } from '@/graphql/types';
import {
  createGuestSchema,
  updateGuestSchema,
  deleteGuestSchema,
  CreateGuestInput,
  UpdateGuestInput,
  DeleteGuestInput,
} from '@/graphql/validation-schemas/guest-schemas';

export const createGuest: ResolverFn<null, CreateGuestInput, any> = async (
  _,
  args,
  { prisma }
) => {
  const data = createGuestSchema.parse(args);
  return await prisma.guests.create({ data });
};

export const updateGuest: ResolverFn<null, UpdateGuestInput, any> = async (
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

export const deleteGuest: ResolverFn<null, DeleteGuestInput, any> = async (
  _,
  args,
  { prisma }
) => {
  const { id } = deleteGuestSchema.parse(args);
  return await prisma.guests.delete({ where: { id } });
};
