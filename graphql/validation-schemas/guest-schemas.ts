import { z } from 'zod';

export const getGuestByIdSchema = z.object({
  id: z.string(),
});
export type GetGuestByIdArgs = z.infer<typeof getGuestByIdSchema>;

export const getGuestsSchema = z.object({});
export type GetGuestsArgs = z.infer<typeof getGuestsSchema>;

export const createGuestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
export type CreateGuestInput = z.infer<typeof createGuestSchema>;

export const updateGuestSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
});
export type UpdateGuestInput = z.infer<typeof updateGuestSchema>;

export const deleteGuestSchema = z.object({
  id: z.string(),
});
export type DeleteGuestInput = z.infer<typeof deleteGuestSchema>;
