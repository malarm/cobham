import { InputBase } from "@mui/material";
import React, { useContext } from "react";
import { PostsContext } from "../App";
import { PostContextType } from "../types/PostContextType";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const { search, setSearch } = useContext(PostsContext) as PostContextType;
    return (<>
        {/* Here Based input done by the user, value is set to setSearch method present in the context which will be filtered in the feed page */}
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'left', width: 300 }}>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Post"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    </>
    );
};

export default Search;
