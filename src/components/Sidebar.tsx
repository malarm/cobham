import {
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography
} from "@mui/material";
import { Stack } from "@mui/system";
import { useContext } from "react";
import { PostsContext } from "../App";
import { PostContextType } from "../types/PostContextType";
import Search from "./Search";

const Sidebar = () => {
    const { posts, tags, searchSelectedTag, setSearchSelectedTag } = useContext(PostsContext) as PostContextType;

    // sorting the control tags based on the number of post present for that particular tag
    const checkboxControlTags = tags.map(tag => {
        return {
            tagName: tag,
            total: posts.filter(x => x.tags.includes(tag)).length
        }
    }).sort((a, b) => b.total - a.total);

    // this vent with helps add and remove tag based on the checkbox selection
    const handlCheckboxChange = (tag: string) => {
        const temp = [...searchSelectedTag];
        if (temp.includes(tag)) {
            setSearchSelectedTag(temp.filter(item => item !== tag));
        } else {
            temp.push(tag);
            setSearchSelectedTag(temp);
        }
    }

    return (
        <Box flex={1} p={2} mt={10}>
            <Box>
                {/* Search Textbox to filter all the post property */}
                <Search />
                {/* Populated all unique tags to filter the post with option to select multiple tag */}
                <Box mt={5} ml={2}>
                    <FormGroup>
                        <Typography variant="h5" mb={2}>Tags</Typography>
                        <Stack pl={4}>
                            {
                                checkboxControlTags.map((tag, index) => {
                                    return <FormControlLabel
                                        key={`tags-${index}`}
                                        style={{ textTransform: 'capitalize' }}
                                        label={`${tag.tagName} (${tag.total})`}
                                        control={
                                            <Checkbox
                                                checked={searchSelectedTag.includes(tag.tagName)}
                                                onChange={() => handlCheckboxChange(tag.tagName)}
                                            />
                                        }
                                    />
                                })
                            }
                        </Stack>
                    </FormGroup>
                </Box>
            </Box>
        </Box >
    );
};
export default Sidebar;
