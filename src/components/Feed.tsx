import React, { useState, useEffect, useContext } from "react";
import { Box, Stack, Skeleton, Typography, styled } from "@mui/material";
import Post from "./Post";
import { PostsContext } from "../App";
import { PostContextType } from "../types/PostContextType";

const StyledTypography = styled(Typography)({
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
    marginTop: "40px"
});

const Feed = () => {
    const { posts, search, searchSelectedTag } = useContext(PostsContext) as PostContextType;
    const [loading, setLoading] = useState(true);
    const filteredPost = posts.sort((a, b) => b.reactions - a.reactions).filter((post) =>
        (
            // Search Filter
            search === null || search === undefined || String(search)?.trim() === '' ||
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.body.toLowerCase().includes(search.toLowerCase()) ||
            String(post.reactions).toLowerCase().includes(search.toLowerCase()) ||
            post.tags.filter(tag => tag.toLowerCase().includes(search.toLowerCase())).length > 0
        )
        &&
        (
            // Tag Filter
            searchSelectedTag.length === 0 || post.tags.filter(tag => searchSelectedTag.includes(tag)).length > 0
        ));

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    });

    return (
        <Box flex={4} p={{ xs: 0, md: 2 }}>
            {/* in the initial showing loading background template */}
            {
                loading &&
                <Stack spacing={1}>
                    <Skeleton variant="text" height={100} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="rectangular" height={300} />
                </Stack>
            }

            {/* Here Post in the feed will be displayed after filtering with no of results found */}
            {
                !loading &&
                <>
                    <StyledTypography variant="subtitle1" color="#1976d2" sx={{ marginRight: 5, fontStyle: 'italic' }}>
                        Found {filteredPost.length} results
                    </StyledTypography>
                    {
                        filteredPost.map((post, index) =>
                            <Post key={index} id={post.id} tags={post.tags} title={post.title} reactions={post.reactions} body={post.body} />
                        )
                    }
                </>
            }
        </Box>
    );
};

export default Feed;
