
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login(
    $email: String!,
    $password: String!
    ) {
    login(
      email: $email,
      password: $password
      ) {
      token
      user {
        username
        bookCount
        email 
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!,
    $email: String!,
    $password: String!
    ) {
    addUser(
      username: $username 
      email: $email
      password: $password
    ) {
      token
      user {
        username
        bookCount
        email 
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $bookId: String!,
    $title: String!,
    $authors: [String],
    $image: String,
    $description: String!,
    $link: String
  ) {
    saveBook(
      bookId: $bookId, 
      title: $title, 
      authors: $authors,
      image: $image,
      description: $description,
      link: $link
    ) {
      email
      username
      bookCount
      savedBooks {
        bookId
        description
        title
        authors
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook(
    $bookId: String!
    ) {
    removeBook(
      bookId: $bookId
      ) {
      email
      username
      bookCount
      savedBooks {
        authors
        description
        bookId
        title
        image
        link
      }
    }
  }
`;