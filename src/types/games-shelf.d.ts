export interface Photo {
  filepath: string;
  webviewPath?: string;
}

export interface Genre {
  value: string;
}

export interface GameForm {
  title: string;
  genres: Genre[];
  platform: Genre;
  picture: string;
  description: string;
}

export interface Image {
  photo?: Photo;
  imageId?: string;
}