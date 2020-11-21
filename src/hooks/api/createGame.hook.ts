
import { useMutation, MutateFunction } from '@vue/apollo-composable'

import { OperationVariables } from 'apollo-client';
import gql from 'graphql-tag';

const createGameMutation = gql`
  mutation CreateGame(
    $title: String!
    $genres: [ID]
    $platform: ID
    $picture: ID
    $description: String
  ) {
    createGame(
      input: {
        data: {
          title: $title
          genres: $genres
          platform: $platform
          picture: $picture
          description: $description
        }
      }
    ) {
      game {
        title
      }
    }
  }
`

declare type CreateGameHook = {
  createGame: MutateFunction<any, OperationVariables>;
}

export const createGameHook = (): CreateGameHook => {
  const { mutate: createGame } = useMutation(createGameMutation);


  return { createGame }
}
