import { makeVar } from '@apollo/client';
import { SortTypes } from '../enums/order';
import { getSongsInputs } from '../types/songData';
// Guide: https://www.apollographql.com/docs/react/local-state/reactive-variables/

export const songQueryVars = makeVar<getSongsInputs>({page: 1, orderBy: {year: SortTypes.desc}});
export const songCurrentPage = makeVar<number>(1);
export const songTotalPages = makeVar<number>(1);
export const openSongTab = makeVar<number>(-1);
