import { gql } from '@apollo/client'
import { OrderBySelect } from '../types/order'

export const GET_SONGS = gql`
  query($search: String, $page: Int, $pageSize: Int, $orderBy: OrderBySelect) {
    getSongs(search: $search, page: $page, pageSize: $pageSize, orderBy: $orderBy) {
      songs{
        _id
        name
        artists
        danceability
        year
        duration_ms
        explicit
        popularity
        rating
      }
      page
      totalPages
    }
  }
`;
