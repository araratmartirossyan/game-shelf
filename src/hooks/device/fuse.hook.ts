import Fuse from 'fuse.js'

export const useSearch = (items: any) => {
  const fuse = new Fuse(items, {
    keys: ['title']
  })

  return {
    search: (value: string) => fuse.search(value)
  }
}