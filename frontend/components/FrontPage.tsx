import {TextInput, Button, Box, Text} from '@react-native-material/core';
import { useState } from 'react';
import DropDown from 'react-native-paper-dropdown'

const FrontPage = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [sort, setSort] = useState<string>("");

    const sortingList = [
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
            value:"duration",
        },
    ];

    return (
        <>
            <Text variant="h4">Spotify explorer</Text>
            <Text variant="h5">Browse through over 169 thousand songs from spotify between 1921 and 2020, and rate your favorites</Text>
            <Box mt={ "20px"} mb={"10px"}>
            <TextInput
                placeholder="Search..."
                />              
            <Button  variant="contained" margin-left={"10px"} title="Search"/>
            </Box>
            <Box>
            
                <DropDown 
                    label={"Sort by"}
                    mode={"outlined"}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    value={sort}
                    setValue={setSort}
                    list={sortingList}
                />
        </Box>

        </>
      )
    }
    
  export default FrontPage;
  