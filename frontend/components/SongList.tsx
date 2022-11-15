import { useEffect } from "react";
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { GET_SONGS } from "../GraphQL/Queries";
import { RATE_SONG } from "../GraphQL/Mutations";
import { getSongsInputs, songsDataType } from "../types/songData";
import { openSongTab, songCurrentPage, songQueryVars, songTotalPages } from '../GraphQL/cache';
import { Text, View } from "react-native";
import { DataTable} from 'react-native-paper';
import { Collapse } from 'accordion-collapse-react-native';
import { Chip, VStack, HStack, IconButton } from "@react-native-material/core"; 
import { Icon } from "react-native-vector-icons/Icon";
import { Rating } from '@rneui/themed';

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
                  <IconButton
                    onPress={() => openSongTab(open === index ? -1 : index)} //Opens song tab if closed, closes the previous tab if new one is clicked
                  >
                    {open === index ? (
                         <IconButton icon={props => <Icon name="wifi" {...props} />} />
                    ) : (
                      <IconButton icon={props => <Icon name="wifi" {...props} />} />
                    )}
                  </IconButton>
                </DataTable.Cell>
                <DataTable.Cell>{song.name}</DataTable.Cell>
                <DataTable.Cell>{song.artists[0]}</DataTable.Cell>
                <DataTable.Cell>{song.year}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Collapse in={open === index} timeout="auto" unmountOnExit>
                  <View style={{width: "auto", display: "flex", flexWrap: 'wrap', flexDirection: 'column'}}> 
                  
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
                      showRating
                      type="song.rating"
                      onStartRating={(newValue: number) => {rateSong({variables: {id: song._id, rating: newValue}})}}/>
                  </VStack>
                  </View>
                  </Collapse>
                </DataTable.Cell>
                </DataTable.Row>
                </>
            )))}
      </DataTable>
    </DataTable>
  </View>
  )
}
