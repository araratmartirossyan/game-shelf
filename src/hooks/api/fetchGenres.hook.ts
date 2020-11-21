import { useQuery, useResult } from '@vue/apollo-composable'
import genresQuery from '@/graph/queries/genres.query.graphql'

interface Genre {
  title: string;
  id: string;
}

const genresHook = () => {
  const { result } = useQuery(genresQuery)
  const genres = useResult(result, null, data => data.genres.map((genre: Genre) => ({ value: genre.id, option: genre.title })))
  return {
    genres
  }
}

export default genresHook