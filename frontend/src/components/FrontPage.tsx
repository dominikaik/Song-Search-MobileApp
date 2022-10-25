import { useEffect, useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { GET_SONGS, RATE_SONG } from "../GraphQL/Queries";
import SongList from "./SongList";
import {MenuItem, Select, Stack, Chip, Rating, InputLabel, FormControl, TextField, Button, Box, Grid, Table, TableCell, TableBody, TableContainer, TableRow, TableHead, Paper, Typography, useTheme, Pagination, PaginationItem, Collapse, IconButton} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const styleTable = {
  p: "10px", 
  width: "65vw", 
  mx: "auto"
}

const styleEx = {
  p: "10px",  
  mx: "auto", 
  mt: "10px", 
  mb: "10px"
}

enum SortBy {
  danceability = 'danceability',
  duration_ms  = 'duration_ms',
  year = 'year',
  popularity = 'popularity'
}

enum SortTypes {
  asc = 'asc',
  desc = 'desc'
}

const FrontPage = () => {
  const [inputs, setInputs] = useState<{search?: string, page: number, pageSize?: number, orderBy?: {[key in SortBy]?: SortTypes}}>({page: 1, orderBy: {year: SortTypes.desc}})
  const [songs, setSongs] = useState<any>(); 
  const [search, setSearch] = useState<string>();
  const [sort, setSort] = useState<SortTypes>(SortTypes.desc);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.year)
  const [open, setOpen] = useState<number>(-1); 
  const [ratedSong, setRatedSong] = useState<{id: string, rating: number | null}>()


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setInputs({...inputs, page: value}); 
  };
  
  const { loading, error, data } = useQuery(GET_SONGS, {
    variables: inputs,
  });
  const [rateSong] = useMutation(RATE_SONG);

  //Using reactive variables in apollo to refetch with new queries if sort order or parameter is changed.
  useEffect(() => {
    setInputs({page: 1, search: inputs.search, orderBy: {[sortBy]: sort}})
  }, [sort, sortBy])
 

  useEffect(() => {
    if(data){
      setSongs(data.getSongs)
    }
  }, [data])
  
  
  if (!songs) return <>Loading</>;
  if (error) return <>error</>;

    return (
      <>
        <Typography color={"white"} variant="h3">Spotify explorer</Typography>
        <Box sx={{ mt: "20px", mb: "10px", mx: "30px",  minWidth:200}}>
            <TextField sx={{ width: "50%" }}
                id="search-text-field" 
                variant='outlined' 
                label="Search for a song or artist" 
                placeholder="Search..."
                size="small" 
                onChange={(e) => {setSearch(e.target.value)
                }} value={search}
                />              
            <Button variant="contained" sx={{ml: "10px"}} onClick={() => (setInputs({search: search, page: 1}))} > 
                Search
            </Button>
            </Box>
            <Box>
            <FormControl sx={{ ml: "10px", minWidth: 120 }}>
                <InputLabel id="dropdown-menu" size='small'>Sort by</InputLabel>
                <Select
                    labelId="dropdown-menu"
                    id="select-search-filter"
                    label="Filter"
                    size='small'
                    defaultValue={"year"}
                >
                    <MenuItem value="year" onClick={() => setSortBy(SortBy.year)} >Year</MenuItem>
                    <MenuItem value="danceability" onClick={() => setSortBy(SortBy.danceability)} >Danceability</MenuItem>
                    <MenuItem value="popularity" onClick={() => setSortBy(SortBy.popularity)} >Popularity</MenuItem>
                    <MenuItem value="duration" onClick={() => setSortBy(SortBy.duration_ms)} >Duration</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ ml: "10px", minWidth: 120 }}>
                <InputLabel id="dropdown-menu" size='small'>Order</InputLabel>
                <Select
                    labelId="dropdown-menu"
                    id="select-ascending-descending"
                    label="Filter"
                    size='small'
                    defaultValue={"desc"}
                >
                    <MenuItem value="asc" onClick={() => setSort(SortTypes.asc)}>↑ Ascending</MenuItem>
                    <MenuItem value="desc" onClick={() => setSort(SortTypes.desc)}>↓ Descending</MenuItem>
                </Select>
            </FormControl>
        </Box>

    <Box>
    <Grid 
    sx={styleTable}
      container
      direction="column"
      alignItems="center" 
      justifyContent="center"
    > 
      <TableContainer sx={{mx:"auto"}} component={Paper}>
        <Table aria-label="songtable">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell> Main Artist</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.songs.map(((song: {name: String, year: number, _id: string, danceability: number, key: number, popularity: number, artists: string[], rating: number | null}, index: number) => (
              <><TableRow key={song._id}>
                {/* Inspiration from this video: https://www.youtube.com/watch?v=3v2cxwvWh80&t=688s */}
                <TableCell>
                  <IconButton
                    onClick={() => setOpen(open === index ? -1 : index)}
                  >
                    {open === index ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.artists[0]}</TableCell>
                <TableCell>{song.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} sx={{paddingBottom: 0, paddingTop: 0, border: "0px"}}>
                  <Collapse in={open === index} timeout="auto" unmountOnExit>
                  <Box 
                  sx={{width: "100%"}}> 
                  
                  <Stack sx={{mt: "10px", mb: "10px", mx: "auto"}} direction="row" spacing={4} justifyItems="center" alignItems="center">
                  <Chip label="Info" color="primary"/>
                  <Chip label={"Danceability: "+ (song.danceability * 100).toFixed()+"%"} variant="outlined" />
                  <Chip label={"Popularity: "+ song.popularity + " / 100"} variant="outlined" />
                  <Chip label={"Key: "+ song.key} variant="outlined" />
                  </Stack>

                  <Stack sx={{styleEx}} direction="row" spacing={4}>
                  <Chip label="Artists" color="primary"/>
                  {song.artists.map((artist: string, i:number) => (
                    <Chip key={i} label={artist} variant="outlined" /> 
                    ))}
                  
                  </Stack>
                  <Box
                    sx={{mt: -6, mb: 3}}
                    flexDirection="column"
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end">
                  <Rating
                      name="song-rating"
                      value={song.rating}
                      onChange={(event, newValue) => {rateSong({variables: {id: song._id, rating: newValue}})}}/>
                  </Box> 

                  </Box>
                  </Collapse>
                </TableCell>
                </TableRow>
                </>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
 
    </Grid>
    </Box>
    <Grid 
    container 
    m={1}
    display="flex"
    direction="column"
    alignItems="center" 
    justifyContent="center">
      <Pagination 
      variant="outlined"
      color="primary"
      count={songs.totalPages} 
      page={songs.page}
      onChange={handlePageChange} 
      />
        </Grid>
      </>
    )
  }
  
export default FrontPage;  
 

