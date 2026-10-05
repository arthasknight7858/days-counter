export interface FavoritePhoto {
  albumId: string;
  folder: string;
  image: string;
  albumTitle?: string;
  addedAt: number;
}

export interface FavoritesData {
  axel: FavoritePhoto[];
  sofi: FavoritePhoto[];
  customPhotos?: Record<string, string[]>;
}
