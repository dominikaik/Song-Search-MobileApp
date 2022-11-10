import { useEffect } from "react";
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { GET_SONGS } from "../GraphQL/Queries";
import { RATE_SONG } from "../GraphQL/Mutations";
import { getSongsInputs, songsDataType } from "../types/songData";
import { openSongTab, songCurrentPage, songQueryVars, songTotalPages } from '../GraphQL/cache';
import { Text, View } from "react-native";
import { DataTable } from 'react-native-paper';

export function SongList() {

    const songVars = useReactiveVar(songQueryVars);
    const open = useReactiveVar(openSongTab);

    // Prepare mutation and query, and do the initial fetch.
    const { loading, error, data } = useQuery<songsDataType, getSongsInputs>(GET_SONGS, {
      variables: songVars,
    });
    const [rateSong] = useMutation(RATE_SONG);
   
  
    useEffect(() => {
      if(data){
        songCurrentPage(data.getSongs.page)
        songTotalPages(data.getSongs.totalPages)
      }
    }, [data])

  if (loading) return <Text> Loading ...</Text>;
  if (error || !data) return <><View style={{ minHeight: '80vh' }} ><Text>Something went wrong :/<br/>Is the backend server running?</Text></View></>;

  return (
    <View 
    style={{
      flexDirection: "column", 
      alignItems: "center", 
      alignContent: "center"
    }}
    >
    <DataTable>
      <DataTable.Header>
        <DataTable.Row key={"song-table"}>
          <DataTable.Cell> </DataTable.Cell>
          <DataTable.Cell key={"name"}> Name </DataTable.Cell>
          <DataTable.Cell key={"main-artist"}> Main Artist </DataTable.Cell>
          <DataTable.Cell key={"year"}> Year </DataTable.Cell>
        </DataTable.Row>
      </DataTable.Header>
      <DataTable>
            {data.getSongs.songs.map(((song, index: number) => (
              <>
              <DataTable.Row key={song._id}>
                {/* Inspiration from this video: https://www.youtube.com/watch?v=3v2cxwvWh80&t=688s */}
                <DataTable.Cell>
                  <IconButton title="expand song info"
                    onClick={() => openSongTab(open === index ? -1 : index)} //Opens song tab if closed, closes the previous tab if new one is clicked
                  >
                    {open === index ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </DataTable.Cell>
                <DataTable.Cell>{song.name}</DataTable.Cell>
                <DataTable.Cell>{song.artists[0]}</DataTable.Cell>
                <DataTable.Cell>{song.year}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell colSpan={5} sx={{paddingBottom: 0, paddingTop: 0, border: "0px"}}>
                  <Collapse in={open === index} timeout="auto" unmountOnExit>
                  <View style={{width: "auto", display: "flex", flexWrap: 'wrap', flexDirection: 'column'}}> 
                  
                  <Chip label="Info" color="primary" sx={{width: 100, mt: 2}}/>
                  <Stack mt={2} direction="row" flexWrap={"wrap"}>
                  <Chip sx={{mb: 2, mr: 2}} label={"Danceability: "+ (song.danceability * 100).toFixed()+"%"} variant="outlined" />
                  <Chip sx={{mb: 2, mr: 2}} label={"Popularity: "+ song.popularity + " / 100"} variant="outlined" />
                  <Chip sx={{mb: 2, mr: 2}} label={Math.floor(song.duration_ms / 60000) +" : "+ ((song.duration_ms % 60000) / 1000).toFixed(0) + " min"} variant="outlined" />
                  {(song.explicit) ? (<Chip label={"Explicit"} variant="outlined" />) : (null)}
                  </Stack>

                  <Chip label="Artists" color="primary" sx={{width: 100, mt: 2}}/>
                  <Stack mt={2} direction="row" flexWrap={"wrap"}>
                  {song.artists.map((artist: string, i:number) => (
                    <Chip key={i} label={artist} variant="outlined" sx={{mb: 2, mr: 2}}/>
                    ))}
                  </Stack>
              
                  <Stack mt={2} direction="column" spacing={2}>
                  <Typography sx={{color:"textColor"}} variant="subtitle2">Rate this song:</Typography>
                  <Rating
                      name="song-rating"
                      value={song.rating}
                      onChange={(event, newValue: number) => {rateSong({variables: {id: song._id, rating: newValue}})}}/>

                  </Stack>
                  </View>
                  </Collapse>
                </TableCell>
                </TableRow>
                </>
            )))}

    </DataTable>
  </View>
  )
}
