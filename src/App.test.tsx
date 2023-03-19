import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import App, { PostsContext } from "./App";

jest.mock("axios");

describe("App", () => {
  const mockedPosts = [
    {
      id: 1,
      title: "His mother had always taught him",
      body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
      userId: 9,
      tags: [
        "history",
        "american",
        "crime"
      ],
      reactions: 2
    },
    {
      id: 2,
      title: "He was an expert but not in a discipline",
      body: "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
      userId: 13,
      tags: [
        "french",
        "fiction",
        "english"
      ],
      reactions: 2
    }];

  beforeEach(() => {
    (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve({ data: { posts: mockedPosts } }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render the PostPage component", async () => {
    render(<App />);

    expect(await screen.findByText("COBHAM SATCOM")).toBeInTheDocument();
  });

  it("should fetch the posts data from the API", async () => {
    render(<App />);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("https://dummyjson.com/posts");
  });

  it("should update the search state when the user types into the search input", async () => {
    render(
      <PostsContext.Provider value={{ search: "", setSearch: jest.fn(), posts: [], tags: [], searchSelectedTag: [], setSearchSelectedTag: jest.fn() }}>
        <App />
      </PostsContext.Provider>
    );

    const searchInput = screen.getByRole("textbox", { name: /search/i });
    userEvent.type(searchInput, "mocked");

    expect(searchInput).toHaveValue("mocked");
  });
});
