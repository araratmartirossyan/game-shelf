import axios from 'axios'
import { Photo } from '@/types/games-shelf';

export const uploadFile = async ({ webviewPath, filepath }: Photo) => {
  const response = await fetch(webviewPath!);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append("files", blob, filepath);

  const { data } = await axios.post('https://api.myshelf.info/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return data
}