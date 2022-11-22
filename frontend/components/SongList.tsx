import { useEffect } from "react";
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { GET_SONGS } from "../GraphQL/queries";
import { RATE_SONG } from "../GraphQL/mutations";
import { getSongsInputs, songsDataType } from "../types/songData";
import { openSongTab, songCurrentPage, songQueryVars, songTotalPages } from '../GraphQL/cache';
import { Text, View } from "react-native";
import { DataTable} from 'react-native-paper';
import { Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import { Chip, VStack, HStack } from "@react-native-material/core"; 
import { Rating } from "react-native-ratings"; 
import { theme } from "../App"; 

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
  if (error || !data) return <><View ><Text>Something went wrong :/<br/>Is the backend server running?</Text></View></>;

  return (
    <View >
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
        {data.getSongs.songs.map(((song) => (
        <>
        <Collapse>
          <CollapseHeader>
              <DataTable.Row key={song._id}>
                {/* Inspiration from this video: https://www.youtube.com/watch?v=3v2cxwvWh80&t=688s */}
                <DataTable.Cell>
                </DataTable.Cell>
                <DataTable.Cell>{song.name}</DataTable.Cell>
                <DataTable.Cell>{song.artists[0]}</DataTable.Cell>
                <DataTable.Cell>{song.year}</DataTable.Cell>
              </DataTable.Row>
            </CollapseHeader>
            <CollapseBody>
              <DataTable.Row>
                <DataTable.Cell>
                  
                    <View > 
                    
                    <Chip label="Info" color="primary"/>
                    <HStack mt={2}>
                    <Chip label={"Danceability: "+ (song.danceability * 100).toFixed()+"%"} variant="outlined" />
                    <Chip label={"Popularity: "+ song.popularity + " / 100"} variant="outlined" />
                    <Chip label={Math.floor(song.duration_ms / 60000) +" : "+ ((song.duration_ms % 60000) / 1000).toFixed(0) + " min"} variant="outlined" />
                    {(song.explicit) ? (<Chip label={"Explicit"} variant="outlined" />) : (null)}
                    </HStack>

                    <Chip label="Artists" color="primary"/>
                    <HStack mt={2}>
                      {song.artists.map((artist: string, i:number) => (
                        <Chip key={i} label={artist} variant="outlined"/>
                      ))}
                    </HStack>
                
                    <VStack mt={2} spacing={2}>
                    <Text>Rate this song:</Text>
                    <Rating
                        key={song.rating}
                        startingValue={song.rating}
                        minValue={0}
                        type="custom"
                        ratingColor={theme.colors.secondary} 
                        imageSize={35}
                       //showRating={true}
                        ratingCount={5}
                        onFinishRating={(newValue: number) => {rateSong({ variables: { id: song._id, rating: newValue } });}}
                        />
                    </VStack>
                    </View>
                </DataTable.Cell>
              </DataTable.Row>
            </CollapseBody>
        </Collapse>
        </>
        )))}
      </DataTable>
    </DataTable>
  </View>
  )
}
