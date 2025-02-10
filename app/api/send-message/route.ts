import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/apollo-server';
import {
  GetChatbotByIdResponse,
  GetChatbotByIdVariables,
  GetMessagesByChatSessionIdResponse,
  GetMessagesByChatSessionIdVariables,
} from '@/types';
import {
  GET_CHATBOT_BY_ID,
  GET_MESSAGES_BY_CHAT_SESSION_ID,
} from '@/graphql/queries';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { CREATE_MESSAGE } from '@/graphql/mutations';
import { auth } from '@clerk/nextjs/server';

const openai = new OpenAI({
  baseURL: 'https://models.inference.ai.azure.com',
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { chat_session_id, chatbot_id, content, name } = await req.json();

  const { getToken } = await auth();

  const token = await getToken();

  const serverClient = createServerClient(token!);

  try {
    const { data: chatbotData } = await serverClient.query<
      GetChatbotByIdResponse,
      GetChatbotByIdVariables
    >({
      query: GET_CHATBOT_BY_ID,
      variables: {
        id: chatbot_id,
      },
    });

    if (!chatbotData.getChatbotById) {
      return NextResponse.json({ err: 'Chatbot not found' }, { status: 404 });
    }

    const { data: messageData } = await serverClient.query<
      GetMessagesByChatSessionIdResponse,
      GetMessagesByChatSessionIdVariables
    >({
      query: GET_MESSAGES_BY_CHAT_SESSION_ID,
      variables: {
        id: chat_session_id,
      },
      fetchPolicy: 'no-cache',
    });

    const previousMessages = messageData.getChatSessionById.messages;

    const formattedPreviousMessages: ChatCompletionMessageParam[] =
      previousMessages.map((message) => ({
        role: message.sender === 'ai' ? 'system' : 'assistant',
        name: message.sender === 'ai' ? 'system' : name,
        content: message.content,
      }));

    const systemPrompt = chatbotData.getChatbotById.chatbot_characteristics
      .map((characteristic) => characteristic.content)
      .join(' + ');

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        name: 'system',
        content: `You are a helpful assistant talking to ${name}. If a generic question is asked which is not relevant or in the same scope or domain as the points in mentioned in the key information section, kindly inform the user they 're only allowed to search for the specified content. Use Emoji's where possible. Here is some key information that you need to be aware of, these are elements you may be asked about: ${systemPrompt}`,
      },
      ...formattedPreviousMessages,
      {
        role: 'user',
        name: name,
        content,
      },
    ];

    const openaiResponse = await openai.chat.completions.create({
      messages,
      model: 'gpt-4o',
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
    });

    const aiResponse = openaiResponse?.choices[0]?.message?.content?.trim();

    if (!aiResponse) {
      console.error('Failed to generate ai response');
      return NextResponse.json(
        { error: 'Failed to generate ai response' },
        { status: 500 }
      );
    }

    await serverClient.mutate({
      mutation: CREATE_MESSAGE,
      variables: {
        chat_session_id,
        content,
        sender: 'user',
      },
    });

    const aiMessageResult = await serverClient.mutate({
      mutation: CREATE_MESSAGE,
      variables: {
        chat_session_id,
        content: aiResponse,
        sender: 'ai',
      },
    });

    return NextResponse.json({
      id: aiMessageResult.data.createMessage.id,
      content: aiResponse,
    });
  } catch (error) {
    console.error('Error sending message', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
