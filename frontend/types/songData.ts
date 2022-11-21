import { SortBy, SortTypes } from "../enums/order";

export type getSongsInputs = {
    search?: string, 
    page: number, 
    pageSize?: number, 
    orderBy?: {[key in SortBy]?: SortTypes}
}

export type songsType = {
    songs: {
        _id: string,
        name: string,
        artists: string[],
        danceability: number,
        year: number,
        explicit: boolean,
        duration_ms: number,
        popularity: number,
        rating: number 
    }[],
    page: number,
    totalPages: number
}

export type songsDataType = {
    getSongs: songsType
}
