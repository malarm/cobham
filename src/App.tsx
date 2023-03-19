import { Box } from "@mui/material";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { PostType } from "./types/PostType";
import { PostContextType } from "./types/PostContextType";
import PostPage from "./pages/PostPage";

// This post context will be used in the application for state management
export const PostsContext = createContext<PostContextType | null>(null);

function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [searchSelectedTag, setSearchSelectedTag] = useState<string[]>([]);
  const url = "https://dummyjson.com/posts";

  // fetching data from the source using axios
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setPosts(response.data.posts);
      const uniqueTags: string[] = [];
      response.data.posts
        .map((x: PostType) => x.tags)
        .reduce((a: string[], b: string[]) => a.concat(b), [])
        .forEach((item: string) => {
          if (uniqueTags.indexOf(item) === -1) {
            uniqueTags.push(item);
          }
        });
      setTags(uniqueTags);
    } catch (error) {
      console.log(error);
    }
  };

  // fetching data on the initial load 
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PostsContext.Provider value={{ search, setSearch, posts, tags, searchSelectedTag, setSearchSelectedTag }}>
      <Box bgcolor={"whitesmoke"} color={"text.primary"}>
        <PostPage />
      </Box>
    </PostsContext.Provider>
  );
}

export default App;
