export interface Chatbot {
  id: number;
  clerk_user_id: string;
  name: string;
  created_at: string;
  chatbot_characteristics: ChatbotCharacteristic[];
  chat_sessions: ChatSession[];
}

export interface ChatbotCharacteristic {
  id: number;
  chatbot_id: number;
  content: string;
  created_at: string;
}

export interface Guest {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface ChatSession {
  id: number;
  chatbot_id: number;
  guest_id: number | null;
  created_at: string;
  messages: Message[];
  guest: Guest;
}

export interface Message {
  id: string;
  chat_session_id: string;
  content: string;
  created_at: string;
  sender: 'ai' | 'user';
}

export interface GetChatbotByIdResponse {
  getChatbotById: Chatbot;
}

export interface GetChatbotByIdVariables {
  id: string;
}

export interface GetChatbotByUserResponse {
  getChatbotsByUser: Chatbot[];
}

export interface GetChatbotByUserVariables {
  clerk_user_id: string;
}

export interface GetChatSessionByIdResponse {
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
}

export interface GetChatSessionByIdVariables {
  id: string;
}

export interface GetMessagesByChatSessionIdResponse {
  getChatSessionById: ChatSession;
}

export interface GetMessagesByChatSessionIdVariables {
  id: string;
}
