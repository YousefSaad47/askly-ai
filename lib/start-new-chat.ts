import {
  CREATE_CHAT_SESSION,
  CREATE_GUEST,
  CREATE_MESSAGE,
} from '@/graphql/mutations';
import apolloClient from '@/lib/apollo-client';

export const startNewChat = async (
  guestName: string,
  guestEmail: string,
  chatbotId: string
) => {
  if (!guestName || !guestEmail) return;

  try {
    const { data: guestData } = await apolloClient.mutate({
      mutation: CREATE_GUEST,
      variables: {
        name: guestName,
        email: guestEmail,
      },
    });

    const { data: chatSesssionData } = await apolloClient.mutate({
      mutation: CREATE_CHAT_SESSION,
      variables: {
        chatbot_id: chatbotId,
        guest_id: guestData.createGuest.id,
      },
    });

    await apolloClient.mutate({
      mutation: CREATE_MESSAGE,
      variables: {
        chat_session_id: chatSesssionData.createChatSession.id,
        content: `Welcome ${guestName}!\n How can I help you today?`,
        sender: 'ai',
      },
    });

    return chatSesssionData.createChatSession.id;
  } catch (error) {
    console.error('Error starting new chat session:', error);
  }
};
