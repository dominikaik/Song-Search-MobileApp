import {Surface, DataTable,  Button, Menu, Divider, Provider, TextInput, Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { SongList } from "./SongList";
import { SortBy, SortTypes } from "../enums/order";
import { openSongTab, songCurrentPage, songQueryVars, songTotalPages } from '../GraphQL/cache';
import { useReactiveVar } from '@apollo/client';
  
function FrontPage() {
  const [search, setSearch] = useState<string>("");
  const [sortVisible, setSortVisible] = useState(false);
  const [orderVisible, setOrderVisible] = useState(false);
  const [sort, setSort] = useState<SortTypes>(SortTypes.desc);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.year)
  const page = useReactiveVar(songCurrentPage);
  const totalPages = useReactiveVar(songTotalPages);
  const inputs = useReactiveVar(songQueryVars);

  const openSortMenu = () => setSortVisible(true);
  const closeSortMenu = () => setSortVisible(false);
  const openOrderMenu = () => setOrderVisible(true);
  const closeOrderMenu = () => setOrderVisible(false);

    const handlePageChange = (value: number) => {
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
          <TextInput placeholder="Search..." onChangeText={value => setSearch(value)} value={search}/>
          <View style={styles.spacerStyle} />
          <Button style={styles.button} mode="contained" onPress={() => {songQueryVars({search: search, page: 1}); openSongTab(-1)}}>Search</Button>
          <View style={styles.spacerStyle} />
          <View style={styles.wrapSorting}>
          <Menu
            visible={sortVisible}
            onDismiss={closeSortMenu}
            anchor={<Button style={styles.button} mode="outlined" onPress={openSortMenu}>Sort by</Button>}>
          <Menu.Item onPress={() => setSortBy(SortBy.year)} title="Year" />
          <Divider />
          <Menu.Item onPress={() => setSortBy(SortBy.danceability)} title="Danceability" />
          <Divider />
          <Menu.Item onPress={() => setSortBy(SortBy.popularity)} title="Popularity" />
          <Divider />
          <Menu.Item onPress={() => setSortBy(SortBy.duration_ms)} title="Duration" />
        </Menu>
          <View style={styles.wrapSpacerStyle} />
          <Menu 
            visible={orderVisible}
            onDismiss={closeOrderMenu}
            anchor={<Button style={styles.button} mode="outlined" onPress={openOrderMenu}>Order by</Button>}>
          <Menu.Item onPress={() => setSort(SortTypes.asc)} title="↑ Ascending" />
          <Divider />
          <Menu.Item onPress={() => setSort(SortTypes.desc)} title="↓ Descending" />
        </Menu>
        </View>
        <View style={styles.spacerStyle} />
          <SongList/>
          <DataTable>
      <DataTable.Pagination 
            page={page}
            numberOfPages={totalPages}
            onPageChange={handlePageChange}
            showFastPaginationControls
            style={{justifyContent: "center"}}
          />
        <View style={styles.pagestyle}>
    <Text>
      Page {`${page} of ${totalPages}`} 
    </Text>
        </View>
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
      marginBottom: 10,
    },
    safeContainerStyle: {
      margin: 15,
    },
    wrapSorting: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center"
    },
    button: {
      borderRadius: 5
    },
     wrapSpacerStyle: {
      padding: 5,
    },
    pagestyle: {
      justifyContent: "center",
      alignSelf: "center",  
      marginBottom: 1, 
      fontFamily: "Arial", 
      fontSize: 13
    }
  });

  export default FrontPage;