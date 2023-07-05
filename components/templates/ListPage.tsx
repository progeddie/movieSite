import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import List from "@components/organisms/List";
import ListItem from "@components/molecules/ListItem";
import { Movie } from "@type/movie";
import { nullCheckNumber } from "@util/util";
import { useRecoilValue, useRecoilState } from "recoil";
import { chacheSelectState, chacheFavoriteState } from "@global/listState";

export default function ListPage({
  props,
  pathname,
}: {
  props: any;
  pathname: string;
}) {
  const { movieList, movieGenre } = props;
  let filterMovieList = movieList;
  const genreArr: { [key: number]: string } = [];
  const selected = useRecoilValue(chacheSelectState);
  const favoriteMovieList = useRecoilValue(chacheFavoriteState);

  // 기존화면 위치로 되돌리기
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const router = useRouter();

  // 최신날짜 / 별점순 정렬
  filterMovieList?.sort((a: Movie, b: Movie) => {
    if (pathname === "/") {
      const itemA = a.release_date.replace(/-/g, "");
      const itemB = b.release_date.replace(/-/g, "");
      const num1 = nullCheckNumber(parseInt(itemA), 0);
      const num2 = nullCheckNumber(parseInt(itemB), 0);
      return num2 - num1;
    } else {
      return b.vote_average - a.vote_average;
    }
  });

  if (pathname === "/MyPick") {
    filterMovieList = filterMovieList.filter((v) =>
      favoriteMovieList.includes(v.id.toString())
    );
  }

  movieGenre?.map((v: any) => {
    genreArr[v!.id] = v!.name;
  });

  useEffect(() => {
    linkRefs.current[selected]?.focus();
  }, [filterMovieList]);

  return (
    <div>
      <List>
        {filterMovieList.length > 0 ? (
          filterMovieList?.map((v: Movie) => (
            <div key={v.id}>
              <ListItem
                movie={v}
                genreArr={genreArr}
                pathname={router.pathname}
              />
              <a
                href="#"
                ref={(ref) => (linkRefs.current[v.id] = ref)}
                className="hiddenInput"
              ></a>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center w-full h-screen font-extrabold text-xl text-center">
            추가된 MY PICK이 없습니다.
          </div>
        )}
      </List>
    </div>
  );
}
