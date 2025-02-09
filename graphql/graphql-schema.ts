import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  type Chatbot {
    id: ID!
    clerk_user_id: String!
    name: String!
    created_at: DateTime!
    chat_sessions: [ChatSession!]
    chatbot_characteristics: [ChatbotCharacteristic!]
  }

  type ChatbotEdge {
    node: Chatbot!
    cursor: String
  }

  type ChatbotConnection {
    edges: [ChatbotEdge!]!
    pageInfo: PageInfo!
  }

  type ChatbotCharacteristic {
    id: ID!
    chatbot_id: String!
    content: String!
    created_at: DateTime!
    chatbot: Chatbot!
  }

  type ChatbotCharacteristicEdge {
    node: ChatbotCharacteristic!
    cursor: String
  }

  type ChatbotCharacteristicConnection {
    edges: [ChatbotCharacteristicEdge!]!
    pageInfo: PageInfo!
  }

  type Guest {
    id: ID!
    name: String
    email: String
    created_at: DateTime!
    chat_sessions: [ChatSession!]
  }

  type ChatSession {
    id: ID!
    chatbot_id: String!
    guest_id: String
    created_at: DateTime!
    chatbot: Chatbot!
    guest: Guest
    messages: [Message!]
  }

  type ChatSessionEdge {
    node: ChatSession!
    cursor: String
  }

  type ChatSessionConnection {
    edges: [ChatSessionEdge!]!
    pageInfo: PageInfo!
  }

  type Message {
    id: ID!
    chat_session_id: String!
    content: String!
    sender: String!
    created_at: DateTime!
    chat_session: ChatSession!
  }

  type MessageEdge {
    node: Message!
    cursor: String
  }

  type MessageConnection {
    edges: [MessageEdge!]!
    pageInfo: PageInfo!
  }
  type Query {
    getChatbots: [Chatbot!]!

    getChatbotsPaginated(first: Int!, after: String): ChatbotConnection!

    getChatbotById(id: ID!): Chatbot
    getChatbotsByUser(clerk_user_id: String!): [Chatbot!]

    getChatbotsByUserPaginated(
      clerk_user_id: String!
      first: Int!
      after: String
    ): ChatbotConnection!

    getChatbotCharacteristics(chatbot_id: String!): [ChatbotCharacteristic!]

    getChatbotCharacteristicsPaginated(
      chatbot_id: String!
      first: Int!
      after: String
    ): ChatbotCharacteristicConnection!

    getChatSessionById(id: ID!): ChatSession
    getChatSessions: [ChatSession!]!

    getChatSessionByChatbotIdPaginated(
      chatbot_id: String!
      first: Int!
      after: String
    ): ChatSessionConnection!

    getGuestById(id: ID!): Guest
    getGuests: [Guest!]!

    getMessageById(id: ID!): Message
    getMessages: [Message!]!

    getMessagesByChatSessionIdPaginated(
      chat_session_id: String!
      first: Int!
      after: String
    ): MessageConnection!
  }

  type Mutation {
    createChatbot(clerk_user_id: String!, name: String!): Chatbot!
    updateChatbot(id: ID!, name: String!): Chatbot
    deleteChatbot(id: ID!): Chatbot

    addChatbotCharacteristic(
      chatbot_id: String!
      content: String!
    ): ChatbotCharacteristic!

    deleteChatbotCharacteristic(id: ID!): ChatbotCharacteristic

    createChatSession(chatbot_id: String!, guest_id: String!): ChatSession!
    updateChatSession(
      id: ID!
      chatbot_id: String
      guest_id: String
    ): ChatSession
    deleteChatSession(id: ID!): ChatSession

    createGuest(name: String!, email: String!): Guest!
    updateGuest(id: ID!, name: String, email: String): Guest
    deleteGuest(id: ID!): Guest

    createMessage(
      chat_session_id: String!
      content: String!
      sender: String!
    ): Message!

    updateMessage(id: ID!, content: String, sender: String): Message
    deleteMessage(id: ID!): Message
  }
`;
