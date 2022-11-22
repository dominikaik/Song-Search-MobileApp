import { useEffect } from "react";
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { GET_SONGS } from "../GraphQL/queries";
import { RATE_SONG } from "../GraphQL/mutations";
import { getSongsInputs, songsDataType } from "../types/songData";
import { openSongTab, songCurrentPage, songQueryVars, songTotalPages } from '../GraphQL/cache';
import { View, StyleSheet } from "react-native";
import { DataTable, Text, Chip} from 'react-native-paper';
import { Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import { VStack, HStack } from "@react-native-material/core"; 
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
          <DataTable.Title style={songStyles.nameCellStyle}> Name </DataTable.Title>
          <DataTable.Title style={songStyles.artistCellStyle}> Main Artist </DataTable.Title> 
          <DataTable.Title style={songStyles.yearCellStyle}> Year </DataTable.Title>
      </DataTable.Header>
        {data.getSongs.songs.map(((song) => (
        <Collapse>
          <CollapseHeader>
              <DataTable.Row>
                <DataTable.Cell style={songStyles.nameCellStyle}>{song.name}</DataTable.Cell>
                <DataTable.Cell style={songStyles.artistCellStyle}>{song.artists[0]}</DataTable.Cell>
                <DataTable.Cell style={songStyles.yearCellStyle}>{song.year}</DataTable.Cell>
              </DataTable.Row>
            </CollapseHeader>

            <CollapseBody>
              <View style={songStyles.wrap}>
                <Chip style={songStyles.spacerStyle} mode="outlined" >Info</Chip>
                <Chip style={songStyles.spacerStyle} >{"Danceability: "+ (song.danceability * 100).toFixed()+"%"}</Chip>
                <Chip style={songStyles.spacerStyle} >{"Popularity: "+ song.popularity + " / 100"}</Chip>
                <Chip style={songStyles.spacerStyle} > {Math.floor(song.duration_ms / 60000) +" : "+ ((song.duration_ms % 60000) / 1000).toFixed(0) + " min"}</Chip>
                  {(song.explicit) ? (<Chip style={songStyles.spacerStyle}>{"Explicit"}</Chip> ) : (null)}
              </View>
              <View style={songStyles.wrap}>
                <Chip style={songStyles.spacerStyle} mode="outlined" >Artists</Chip>
                  {song.artists.map((artist: string, i:number) => (
                    <Chip style={songStyles.spacerStyle}>{artist}</Chip> /*key={i}*/
                  ))}
              </View>
              <View style={songStyles.wrap}>
                <Text>Rate this song:</Text>
                  <View style={songStyles.spacerStyle}/>
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
              </View>
            </CollapseBody>
          </Collapse>
          )))}
        </DataTable>
    </View>
    );
  }

  const songStyles = StyleSheet.create({
    nameCellStyle: {
      padding: 5,
      flex: 0.55,
    },
    artistCellStyle: {
      padding: 5,
      flex: 0.4,
    },
    yearCellStyle: {
      padding: 5,
      flex: 0.15,
    },
    wrap: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    spacerStyle: {
      margin: 4,
    },
  });