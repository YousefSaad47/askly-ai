export type ConnectionResponse<Key extends string, T> = {
  [K in Key]: {
    __typename: string;
    edges: Array<{
      node: T;
      cursor: string;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
};

export type ChatbotCharacteristicConnection = ConnectionResponse<
  'getChatbotCharacteristicsPaginated',
  ChatbotCharacteristic
>;

export type ChatSessionConnection = ConnectionResponse<
  'getChatSessionByChatbotIdPaginated',
  ChatSession
>;

export type MessageConnection = ConnectionResponse<
  'getMessagesByChatSessionIdPaginated',
  Message
>;

export type Chatbot = {
  id: string;
  clerk_user_id: string;
  name: string;
  created_at: string;
  chatbot_characteristics: ChatbotCharacteristic[];
  chat_sessions: ChatSession[];
};

export type ChatbotCharacteristic = {
  id: number;
  chatbot_id: number;
  content: string;
  created_at: string;
};

export type Guest = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export type Message = {
  id: string;
  chat_session_id: string;
  content: string;
  created_at: string;
  sender: 'ai' | 'user';
};

export type ChatSession = {
  id: number;
  chatbot_id: number;
  guest_id: number | null;
  created_at: string;
  messages: Message[];
  guest: Guest;
};

export type GetChatbotByIdResponse = {
  getChatbotById: Chatbot;
};

export type GetChatbotByIdVariables = {
  id: string;
};

export type GetChatbotByUserResponse = {
  getChatbotsByUser: Chatbot[];
};

export type GetChatbotByUserVariables = {
  clerk_user_id: string;
};

export type GetChatbotsByUserPaginatedResponse = ConnectionResponse<
  'getChatbotsByUserPaginated',
  Chatbot
>;

export type GetChatbotsByUserPaginatedVariables = {
  clerk_user_id: string;
  first: number;
  after?: string;
};

export type GetChatSessionByIdResponse = {
  getChatSessionById: {
    id: string;
    created_at: string;
    messages: Message[];
    chatbot: {
      name: string;
    };
    guest: {
      name: string;
      email: string;
    };
  };
};

export type GetChatSessionByIdVariables = {
  id: string;
};

export type GetMessagesByChatSessionIdResponse = {
  getChatSessionById: ChatSession;
};

export type GetMessagesByChatSessionIdVariables = {
  id: string;
};
