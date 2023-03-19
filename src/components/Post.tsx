import { FavoriteSharp } from "@mui/icons-material";
import {

    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
    Button,
    Chip
} from "@mui/material";
import React, { useState } from "react";
import { PostType } from '../types/PostType';

const Post = (post: PostType) => {
    const { title, tags, reactions, body } = post;
    const [readmore, setReadMore] = useState(false);
    const today = new Date();
    const date = `${today.toLocaleString("default", {
        month: "long"
    })} ${today.getDate()}, ${today.getFullYear()}`;

    return (
        <Card sx={{ margin: 5 }}>
            {/* Title of the Post */}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "#378fe9" }} aria-label="malar">
                        M
                    </Avatar>
                }
                title={<Typography variant="h5">{title}</Typography>}
                subheader={date}
            />
            {/* Body of the Post with show more or less feature */}
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    {readmore ? body : `${body.substring(0, 200)}...`}
                    <Button onClick={() => setReadMore(!readmore)}>
                        {" "}
                        {readmore ? "Show less" : "Read more"}
                    </Button>
                </Typography>
            </CardContent>
            {/* Tag and Reactions to the Post */}
            <CardActions>
                <IconButton aria-label="add to reactions" >
                    <FavoriteSharp style={{ color: "red", marginRight: '5px' }} />
                    <Typography>{reactions}</Typography>
                </IconButton>
                {tags.map((tag: string) => (
                    <Chip
                        key={tag}
                        label={tag}
                        sx={{ textTransform: 'capitalize' }}
                    />
                ))}
            </CardActions>
        </Card >
    );
};

export default Post;
