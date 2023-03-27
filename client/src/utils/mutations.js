import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login(
    $email: String! 
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email 
        bookCount
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      $username: String!
      email: $email
      password: $password
    ) {
      token
      user {
        username
        email 
        bookCount   
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!, $title: String!, $description: String!, $authors: [String], $image: String, $link: String) {
    saveBook( bookId: $bookId, title: $title, description: $description, authors: $authors, image: $image, link: $link) {
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;