import { atom, selector } from "recoil";
import { Movie } from "@type/movie";

export const chachePageState = atom({
  key: "chachePageState",
  default: "/",
});

export const chacheSelectState = atom({
  key: "chacheSelectState",
  default: 0,
});

export const listState = atom({
  key: "listState",
  default: [] as Movie[],
});

export const getListMovie = selector({
  key: "getListMovie",
  get: ({ get }) => {
    return get(listState);
  },

  set: ({ set }, newValue: any) => {
    set(listState, newValue);
  },
});

export const chacheFavoriteState = atom({
  key: "chacheFavoriteState",
  default: [] as Array<number>,
});
