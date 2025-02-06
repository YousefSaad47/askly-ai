import { gql } from '@apollo/client';

export const CREATE_CHATBOT = gql`
  mutation CreateChatbot($clerk_user_id: String!, $name: String!) {
    createChatbot(clerk_user_id: $clerk_user_id, name: $name) {
      id
      name
    }
  }
`;

export const UPDATE_CHATBOT = gql`
  mutation UpdateChatbot($id: ID!, $name: String!) {
    updateChatbot(id: $id, name: $name) {
      id
      name
      created_at
    }
  }
`;

export const DELETE_CHATBOT = gql`
  mutation DeleteChatbot($id: ID!) {
    deleteChatbot(id: $id) {
      id
    }
  }
`;

export const ADD_CHARACTERISTIC = gql`
  mutation AddCharacteristic($chatbotId: String!, $content: String!) {
    addChatbotCharacteristic(chatbot_id: $chatbotId, content: $content) {
      id
      content
      created_at
    }
  }
`;

export const REMOVE_CHARACTERISTIC = gql`
  mutation RemoveCharacteristic($characteristic_id: ID!) {
    deleteChatbotCharacteristic(id: $characteristic_id) {
      id
    }
  }
`;
