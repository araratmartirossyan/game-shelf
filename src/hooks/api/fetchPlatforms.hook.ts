import { useQuery, useResult } from '@vue/apollo-composable'
import platformsQuery from '@/graph/queries/platforms.query.graphql'

export interface Platform {
  title: string;
  id: string;
}

const platformsHook = () => {
  const { result } = useQuery(platformsQuery)
  const platforms = useResult(result, null, data => data.platforms.map((platform: Platform) => ({ value: platform.id, option: platform.title })))
  return {
    platforms
  }
}

export default platformsHook