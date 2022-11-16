import {Surface, DataTable,  Button, Menu, Divider, Provider  } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {TextInput} from "@react-native-material/core";
import { SongList } from "./SongList";
import { SortBy, SortTypes } from "../enums/order";
import { openSongTab, songCurrentPage, songQueryVars, songTotalPages } from '../GraphQL/cache';
import { useReactiveVar } from '@apollo/client';
  
function FrontPage() {
  const [search, setSearch] = useState<string>("");
  const [sortVisible, setSortVisible] = React.useState(false);
  const [orderVisible, setOrderVisible] = React.useState(false);
  const [sort, setSort] = useState<SortTypes>(SortTypes.desc);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.year)
  const page = useReactiveVar(songCurrentPage);
  const totalPages = useReactiveVar(songTotalPages);
  const inputs = useReactiveVar(songQueryVars);

  const openSortMenu = () => setSortVisible(true);
  const closeSortMenu = () => setSortVisible(false);
  const openOrderMenu = () => setOrderVisible(true);
  const closeOrderMenu = () => setOrderVisible(false);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      songQueryVars({...inputs, page: value})
      openSongTab(-1)
    };
  
    useEffect(() => {
      songQueryVars({...inputs, page: 1, orderBy: {[sortBy]: sort}})
      openSongTab(-1)
    }, [sort, sortBy])
  
  
    return (
      <>
      <Surface style={styles.containerStyle}>
        <SafeAreaView style={styles.safeContainerStyle}>
          <TextInput variant="outlined" placeholder="Search..." />
          <Button style={styles.button} onPress={() => {songQueryVars({search: search, page: 1}); openSongTab(-1)}}>Search</Button>
          <Menu
            visible={sortVisible}
            onDismiss={closeSortMenu}
            anchor={<Button onPress={openSortMenu}>Sort by</Button>}>
          <Menu.Item onPress={() => setSortBy(SortBy.year)} title="Year" />
          <Menu.Item onPress={() => setSortBy(SortBy.danceability)} title="Danceability" />
          <Divider />
          <Menu.Item onPress={() => setSortBy(SortBy.popularity)} title="Popularity" />
          <Menu.Item onPress={() => setSortBy(SortBy.duration_ms)} title="Duration" />
        </Menu>
          <View style={styles.spacerStyle} />
          <Menu
            visible={orderVisible}
            onDismiss={closeOrderMenu}
            anchor={<Button onPress={openOrderMenu}>Order by</Button>}>
          <Menu.Item onPress={() => setSort(SortTypes.asc)} title="↑ Ascending" />
          <Menu.Item onPress={() => setSort(SortTypes.desc)} title="↓ Descending" />
        </Menu>
          <SongList/>

          <DataTable>
      <DataTable.Pagination
            page={page}
            numberOfPages={totalPages}
            onPageChange={() => handlePageChange}
          />
       </DataTable>
        </SafeAreaView>
      </Surface>
      
      </>
    );
  }
    
  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1, 
    },
    spacerStyle: {
      marginBottom: 15,
    },
    safeContainerStyle: {
      flex: 1,
      margin: 20,
      justifyContent: "center",
    },
    button: {
      backgroundColor: "#52796F"
    }
  });

  export default FrontPage;