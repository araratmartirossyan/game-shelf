export const findGenres = (currentGenres: any, genres: any) =>
  currentGenres
    .map((genre: any) => {
      const findGenre = genres.find(
        (i: any) => i.option === genre.name,
      );
      return findGenre;
    })
    .filter((i: any) => i);

export const preparePlatforms = (currentPlatforms: any, platforms: any) =>
  currentPlatforms
    .map(({ platform }: any) => platform)
    .map((platform: any) => {
      const genresFiltered = platforms.find(
        (i: any) => i.option === platform.name,
      );

      return genresFiltered;
    });