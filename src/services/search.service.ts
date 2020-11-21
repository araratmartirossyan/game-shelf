import { request } from '@/utils/rest'

export const findGame = async (searchString: string) => {
  const data = await request(`games?search=${searchString}`)
  return data
}

export const fetchGame = async (id: string | string[]) => {
  const data = await request(`games/${id}`)
  return data
}