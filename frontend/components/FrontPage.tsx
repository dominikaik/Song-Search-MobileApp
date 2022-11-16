import {Surface, DataTable,  Button, Menu, Divider, Provider  } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {TextInput} from "@react-native-material/core";
import { SongList } from "./SongList";
import { SortBy, SortTypes } from "../enums/order";
import { openSongTab, songCurrentPage, songQueryVars, songTotalPages } from '../GraphQL/cache';
import { useReactiveVar } from '@apollo/client';
  
function FrontPage() {
  const [showSortDropDown, setShowSortDropDown] = useState(false);
  const [sortlist, setSorting] = useState<string>("");
  const [showOrderDropDown, setShowOrderDropDown] = useState(false);
  const [order, setOrder] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [visible, setVisible] = React.useState(false);
  const [sort, setSort] = useState<SortTypes>(SortTypes.desc);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.year)
  const page = useReactiveVar(songCurrentPage);
  const totalPages = useReactiveVar(songTotalPages);
  const inputs = useReactiveVar(songQueryVars);


  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
    const sortList = [
      {
        label: "Year",
        value: "year",
      },
      {
        label: "Danceability",
        value: "danceability",
      },
      {
        label: "Popularity",
        value: "popularity",
      },
      {
        label: "Duration",
        value: "duration",
      },
    ];
    const orderList = [
      {
        label: "↑ Ascending",
        value: "asc",
      },
      {
        label: "↓ Descending",
        value: "desc",
      },
    ];

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      songQueryVars({...inputs, page: value})
      // Close open info on page change
      openSongTab(-1)
    };
  
    useEffect(() => {
      //Using reactive variables in apollo to refetch with new queries if sort order or parameter is changed.
      songQueryVars({...inputs, page: 1, orderBy: {[sortBy]: sort}})
      // Close open info when filtering
      openSongTab(-1)
      // Eslint thinks useEffect should re-render when reactive variable changes.
      // This will cause a loop/wrong behavior, we therefore remove this rule.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, sortBy])
  
    useEffect(() => {
      document.title = 'Spotify explorer'
    }, [])
  
  
    return (
      <>
      <Surface style={styles.containerStyle}>
        <SafeAreaView style={styles.safeContainerStyle}>
          <TextInput variant="outlined" placeholder="Search..." />
          <Button style={styles.button} onPress={() => {songQueryVars({search: search, page: 1}); openSongTab(-1)}}>Search</Button>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Sort by</Button>}>
          <Menu.Item onPress={() => setSortBy(SortBy.year)} title="Year" />
          <Menu.Item onPress={() => setSortBy(SortBy.danceability)} title="Danceability" />
          <Divider />
          <Menu.Item onPress={() => setSortBy(SortBy.popularity)} title="Popularity" />
          <Menu.Item onPress={() => setSortBy(SortBy.duration_ms)} title="Duration" />
        </Menu>
          <View style={styles.spacerStyle} />
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Order by</Button>}>
          <Menu.Item onPress={() => setSort(SortTypes.asc)} title="↑ Ascending" />
          <Menu.Item onPress={() => setSort(SortTypes.desc)} title="↓ Descending" />
        </Menu>
          <SongList/>
        </SafeAreaView>
      </Surface>
      <DataTable>
      <DataTable.Pagination
            page={page}
            numberOfPages={totalPages}
            onPageChange={() => handlePageChange}
          />
       </DataTable>
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