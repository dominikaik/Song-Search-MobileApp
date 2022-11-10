import { SortTypes } from "../enums/order"

export type OrderBySelect = {
    year?: SortTypes
    popularity?: SortTypes
    danceability?: SortTypes
    duration_ms?: SortTypes
  }
