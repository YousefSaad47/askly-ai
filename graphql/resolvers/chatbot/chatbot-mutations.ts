import { ResolverFn } from '@/graphql/types';
import {
  createChatbotSchema,
  updateChatbotSchema,
  deleteChatbotSchema,
  addChatbotCharacteristicSchema,
  CreateChatbotInput,
  UpdateChatbotInput,
  DeleteChatbotInput,
  AddChatbotCharacteristicInput,
  deleteChatbotCharacteristicSchema,
  DeleteChatbotCharacteristicInput,
} from '@/graphql/validation-schemas/chatbot-schemas';

export const createChatbot: ResolverFn<null, CreateChatbotInput, any> = async (
  _,
  args,
  { prisma }
) => {
  const data = createChatbotSchema.parse(args);
  return await prisma.chatbots.create({ data });
};

export const updateChatbot: ResolverFn<null, UpdateChatbotInput, any> = async (
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

export const deleteChatbot: ResolverFn<null, DeleteChatbotInput, any> = async (
  _,
  args,
  { prisma }
) => {
  const { id } = deleteChatbotSchema.parse(args);
  return await prisma.chatbots.delete({ where: { id } });
};

export const addChatbotCharacteristic: ResolverFn<
  null,
  AddChatbotCharacteristicInput,
  any
> = async (_, args, { prisma }) => {
  const data = addChatbotCharacteristicSchema.parse(args);
  return await prisma.chatbot_characteristics.create({ data });
};

export const deleteChatbotCharacteristic: ResolverFn<
  null,
  DeleteChatbotCharacteristicInput,
  any
> = async (_, args, { prisma }) => {
  const { id } = deleteChatbotCharacteristicSchema.parse(args);
  return await prisma.chatbot_characteristics.delete({ where: { id } });
};
