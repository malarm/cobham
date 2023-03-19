import { PostType } from "./PostType"

export type PostContextType = {
    posts: PostType[];
    tags: string[];
    search: string;
    setSearch: (searchString: string) => void;
    searchSelectedTag: string[];
    setSearchSelectedTag: (tags: string[]) => void;
}