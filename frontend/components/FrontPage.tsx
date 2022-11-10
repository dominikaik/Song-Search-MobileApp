import {Appbar, MD3DarkTheme, DefaultTheme, Provider, Surface } from "react-native-paper";
  import React, { useState } from "react";
  import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
  import DropDown from "react-native-paper-dropdown";
  import {TextInput, Button, Text} from "@react-native-material/core";
  
  function FrontPage() {
    const [showSortDropDown, setShowSortDropDown] = useState(false);
    const [sort, setSorting] = useState<string>("");
    const [showOrderDropDown, setShowOrderDropDown] = useState(false);
    const [order, setOrder] = useState<string>("");
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
  
    return (
        <View>
            <Surface style={styles.containerStyle}>
                <SafeAreaView style={styles.safeContainerStyle}>
                    <TextInput variant="outlined" placeholder="Search..."/>
                    <Button variant="contained" title="Search" />
                    <DropDown
                        label={"Sort by"}
                        mode={"outlined"}
                        visible={showSortDropDown}
                        showDropDown={() => setShowSortDropDown(true)}
                        onDismiss={() => setShowSortDropDown(false)}
                        value={sort}
                        setValue={setSorting}
                        list={sortList}
                    />
                    <View style={styles.spacerStyle} />
                    <DropDown
                        label={"Order by"}
                        mode={"outlined"}
                        visible={showOrderDropDown}
                        showDropDown={() => setShowOrderDropDown(true)}
                        onDismiss={() => setShowOrderDropDown(false)}
                        value={order}
                        setValue={setOrder}
                        list={orderList}
                    />
                </SafeAreaView>
            </Surface>
        </View>
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
    });

  export default FrontPage;