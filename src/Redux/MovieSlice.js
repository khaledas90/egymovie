import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  pages: 1,
  AllMovies: Cookies.get("AllMovies")
    ? JSON.parse(Cookies.get("AllMovies"))
    : [],
  User: Cookies.get("User") ? JSON.parse(Cookies.get("User")) : [],
  Favorites: Cookies.get("Favorites")
    ? JSON.parse(Cookies.get("Favorites"))
    : [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    NextPage: (state) => {
      state.pages += 1;
    },
    PrevPage: (state) => {
      if (state.pages > 1) state.pages -= 1;
    },
    AddUser: (state, action) => {
      state.User.push(action.payload);
      Cookies.set("User", JSON.stringify(state.User));
    },
    UpdateUser: (state, action) => {
      if (state.User.length > 0) {
        const user = state.User[0];
        user.Name = action.payload.Name;
        user.Email = action.payload.Email;
        user.Phone = action.payload.Phone;
        user.Password = action.payload.Password;
      }
      Cookies.set("User", JSON.stringify(state.User));
    },
    LogOutUser: (state) => {
      state.User = [];
      Cookies.set("User", JSON.stringify(state.User));
    },
    moviesAll: (state, action) => {
      const updatedMovies = [...state.AllMovies, ...action.payload];
      state.AllMovies = updatedMovies;
      Cookies.set("AllMovies", JSON.stringify(updatedMovies));
    },
    AddFavorite: (state, action) => {
      if (!state.Favorites.some((movie) => movie.id === action.payload.id)) {
        state.Favorites.push(action.payload);
        Cookies.set("Favorites", JSON.stringify(state.Favorites));
      }
    },
    RemoveFavorites: (state, action) => {
      state.Favorites = state.Favorites.filter(
        (movie) => movie.id !== action.payload
      );
      console.log(state.Favorites);
      Cookies.set("Favorites", JSON.stringify(state.Favorites));
    },
  },
});

export const {
  NextPage,
  PrevPage,
  AddUser,
  UpdateUser,
  LogOutUser,
  moviesAll,
  AddFavorite,
  RemoveFavorites,
} = movieSlice.actions;
export default movieSlice.reducer;
