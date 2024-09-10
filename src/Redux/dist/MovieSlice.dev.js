"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RemoveFavorites = exports.AddFavorite = exports.moviesAll = exports.LogOutUser = exports.UpdateUser = exports.AddUser = exports.PrevPage = exports.NextPage = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var initialState = {
  pages: 1,
  AllMovies: _jsCookie["default"].get("AllMovies") ? JSON.parse(_jsCookie["default"].get("AllMovies")) : [],
  User: _jsCookie["default"].get("User") ? JSON.parse(_jsCookie["default"].get("User")) : [],
  Favorites: _jsCookie["default"].get("Favorites") ? JSON.parse(_jsCookie["default"].get("Favorites")) : []
};
var movieSlice = (0, _toolkit.createSlice)({
  name: "movie",
  initialState: initialState,
  reducers: {
    NextPage: function NextPage(state) {
      state.pages += 1;
    },
    PrevPage: function PrevPage(state) {
      if (state.pages > 1) state.pages -= 1;
    },
    AddUser: function AddUser(state, action) {
      state.User.push(action.payload);

      _jsCookie["default"].set("User", JSON.stringify(state.User));
    },
    UpdateUser: function UpdateUser(state, action) {
      if (state.User.length > 0) {
        var user = state.User[0];
        user.Name = action.payload.Name;
        user.Email = action.payload.Email;
        user.Phone = action.payload.Phone;
        user.Password = action.payload.Password;
      }

      _jsCookie["default"].set("User", JSON.stringify(state.User));
    },
    LogOutUser: function LogOutUser(state) {
      state.User = [];

      _jsCookie["default"].set("User", JSON.stringify(state.User));
    },
    moviesAll: function moviesAll(state, action) {
      var updatedMovies = [].concat(_toConsumableArray(state.AllMovies), _toConsumableArray(action.payload));
      state.AllMovies = updatedMovies;

      _jsCookie["default"].set("AllMovies", JSON.stringify(updatedMovies));
    },
    AddFavorite: function AddFavorite(state, action) {
      if (!state.Favorites.some(function (movie) {
        return movie.id === action.payload.id;
      })) {
        state.Favorites.push(action.payload);

        _jsCookie["default"].set("Favorites", JSON.stringify(state.Favorites));
      }
    },
    RemoveFavorites: function RemoveFavorites(state, action) {
      state.Favorites = state.Favorites.filter(function (movie) {
        return movie.id !== action.payload;
      });
      console.log(state.Favorites);

      _jsCookie["default"].set("Favorites", JSON.stringify(state.Favorites));
    }
  }
});
var _movieSlice$actions = movieSlice.actions,
    NextPage = _movieSlice$actions.NextPage,
    PrevPage = _movieSlice$actions.PrevPage,
    AddUser = _movieSlice$actions.AddUser,
    UpdateUser = _movieSlice$actions.UpdateUser,
    LogOutUser = _movieSlice$actions.LogOutUser,
    moviesAll = _movieSlice$actions.moviesAll,
    AddFavorite = _movieSlice$actions.AddFavorite,
    RemoveFavorites = _movieSlice$actions.RemoveFavorites;
exports.RemoveFavorites = RemoveFavorites;
exports.AddFavorite = AddFavorite;
exports.moviesAll = moviesAll;
exports.LogOutUser = LogOutUser;
exports.UpdateUser = UpdateUser;
exports.AddUser = AddUser;
exports.PrevPage = PrevPage;
exports.NextPage = NextPage;
var _default = movieSlice.reducer;
exports["default"] = _default;