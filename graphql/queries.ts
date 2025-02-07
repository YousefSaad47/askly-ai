import { gql } from '@apollo/client';

export const GET_CHATBOT_BY_ID = gql`
  query GetChatbotById($id: ID!) {
    getChatbotById(id: $id) {
      id
      name
      created_at
      chatbot_characteristics {
        id
        content
        created_at
      }
      chat_sessions {
        id
        created_at
        guest_id
        messages {
          id
          content
          created_at
        }
      }
    }
  }
`;

export const GET_CHATBOTS_BY_USER = gql`
  query GetChatbotsByUser($clerk_user_id: String!) {
    getChatbotsByUser(clerk_user_id: $clerk_user_id) {
      id
      name
      created_at
      chatbot_characteristics {
        id
        content
        created_at
      }
      chat_sessions {
        id
        created_at
        guest_id
        guest {
          name
          email
        }
        messages {
          id
          content
          created_at
        }
      }
    }
  }
`;

export const GET_CHAT_SESSION_BY_ID = gql`
  query GetChatSessionById($id: ID!) {
    getChatSessionById(id: $id) {
      id
      created_at
      messages {
        id
        content
        created_at
        sender
      }
      chatbot {
        id
        name
      }
      guest {
        name
        email
      }
    }
  }
`;
