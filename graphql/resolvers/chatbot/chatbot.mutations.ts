import { ResolverFn } from '@/graphql/types';
import {
  createChatbotSchema,
  updateChatbotSchema,
  deleteChatbotSchema,
  addChatbotCharacteristicSchema,
} from '@/graphql/validation-schemas/chatbotSchemas';

export const createChatbot: ResolverFn<null, any, any> = async (
  _,
  args,
  { prisma }
) => {
  const data = createChatbotSchema.parse(args);
  return await prisma.chatbots.create({ data });
};

export const updateChatbot: ResolverFn<null, any, any> = async (
  _,
  args,
  { prisma }
) => {
  const { id, name } = updateChatbotSchema.parse(args);
  return await prisma.chatbots.update({
    where: { id },
    data: { name },
  });
};

export const deleteChatbot: ResolverFn<null, { id: string }, any> = async (
  _,
  args,
  { prisma }
) => {
  const { id } = deleteChatbotSchema.parse(args);
  return await prisma.chatbots.delete({ where: { id } });
};

export const addChatbotCharacteristic: ResolverFn<
  null,
  { chatbot_id: string; content: string },
  any
> = async (_, args, { prisma }) => {
  const data = addChatbotCharacteristicSchema.parse(args);
  return await prisma.chatbot_characteristics.create({ data });
};

export const deleteChatbotCharacteristic: ResolverFn<
  null,
  { id: string },
  any
> = async (_, args, { prisma }) => {
  const { id } = deleteChatbotSchema.parse(args);
  return await prisma.chatbot_characteristics.delete({ where: { id } });
};
