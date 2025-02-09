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

export const GET_CHATBOTS_BY_USER_PAGINATED = gql`
  query GetChatbotsByUserPaginated(
    $clerk_user_id: String!
    $first: Int!
    $after: String
  ) {
    getChatbotsByUserPaginated(
      clerk_user_id: $clerk_user_id
      first: $first
      after: $after
    ) {
      edges {
        node {
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
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_CHATBOT_CHARACTERISTICS_PAGINATED = gql`
  query GetChatbotCharacteristicsPaginated(
    $chatbot_id: String!
    $first: Int!
    $after: String
  ) {
    getChatbotCharacteristicsPaginated(
      chatbot_id: $chatbot_id
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          content
          created_at
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_MESSAGES_BY_CHAT_SESSION_ID_PAGINATED = gql`
  query GetMessagesByChatSessionIdPaginated(
    $chat_session_id: String!
    $first: Int!
    $after: String
  ) {
    getMessagesByChatSessionIdPaginated(
      chat_session_id: $chat_session_id
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          content
          created_at
          sender
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_MESSAGES_BY_CHAT_SESSION_ID = gql`
  query GetMessagesByChatSessionId($id: ID!) {
    getChatSessionById(id: $id) {
      id
      messages {
        id
        content
        sender
        created_at
      }
    }
  }
`;

export const GET_CHAT_SESSIONS_BY_CHATBOT_ID_PAGINATED = gql`
  query GetChatSessionsByChatbotIdPaginated(
    $chatbot_id: String!
    $first: Int!
    $after: String
  ) {
    getChatSessionByChatbotIdPaginated(
      chatbot_id: $chatbot_id
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          created_at
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
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
