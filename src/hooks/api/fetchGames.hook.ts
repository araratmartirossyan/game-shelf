import { useQuery } from '@vue/apollo-composable'
import gamesQuery from '@/graph/queries/games.query.graphql'

export const gamesHook = () => {
  const { refetch, result: gamesResult, loading, error } = useQuery(gamesQuery)

  return {
    gamesResult,
    refetch,
    loading,
    error,
  }
}
