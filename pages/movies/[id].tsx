import { useEffect, useState, MouseEvent, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Movie, ProductionCompanies, Genre } from "@type/movie";
import { imageLoader } from "@util/util";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { chacheFavoriteState } from "@global/listState";
import { addItem, removeFilter } from "@util/util";

export default function Detail() {
    const router = useRouter();
    const [movie, setMovie] = useState<Movie>();
    const [moviePoster, setMoviePoster] = useState<string>("");
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const oldImage = useRef<HTMLDivElement>(null);
    const favoriteMovieList = useRecoilValue(chacheFavoriteState);
    const setFavorite = useSetRecoilState(chacheFavoriteState);

    useEffect(() => {
        const fetchData = async () => {
            const res = await (
                await fetch(`http://localhost:3000/ko/api/movies/${router.query.id}`)
            ).json();
            setMovie(res);
            setMoviePoster(`${res.poster_path}`);
        };
        fetchData();
    }, [router.query.id]);

    useEffect(() => {
        favoriteMovieList?.map((v, i) => {
            if (v.toString() === router.query.id) {
                setIsFavorite(true);
            }
        });
    }, [isFavorite]);

    const goHome = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const popup = window.open(movie?.homepage);
        popup?.focus();
    };

    const clickImg = (e: MouseEvent<HTMLImageElement>) => {
        const oldImg = oldImage.current;
        e.preventDefault();
        // const target = e.currentTarget;
        const src = e.currentTarget.src;
        const srcArr = src.split("//");

        oldImg?.animate([{ opacity: 0 }, { opacity: 1 }], 500);
        setMoviePoster(srcArr[2]);
    };

    const favoriteFn = (e: MouseEvent<HTMLDivElement>) => {
        if (isFavorite === false) {
            setFavorite((oldFavor) => addItem(oldFavor, router.query.id));
            setIsFavorite(true);
        } else {
            setFavorite((oldFavor) => removeFilter(oldFavor, router.query.id));
            setIsFavorite(false);
        }
    };

    return (
        movie && (
            <div
                ref={oldImage}
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${moviePoster})`,
                }}
                className="body bg-[image:var(backgroundImage)] flex flex-row flex-wrap; min-h-screen"
            >
                <div className="bg-blue-100/50">
                    <div className="p-5">
                        <div className="font-bold text-xl">
                            {movie.title}({movie.original_title})
                        </div>
                        <div className="flex flex-row font-bold text-sm mt-2">
                            {movie?.genres?.map(
                                (v: Genre) =>
                                    v?.name && (
                                        <div
                                            key={v.id}
                                            className="mr-2 bg-green-500 rounded-sm text-white p-1"
                                        >
                                            {v?.name}
                                        </div>
                                    )
                            )}
                        </div>
                        {/* 포스터 영역 */}
                        <div className="flex flex-row mt-5 box-border border-2 shadow-lg shadow-indigo-500/50 overflow-hidden">
                            {movie.poster_path && (
                                <div className="border border-slate-300 invert-0 hover:invert">
                                    <Image
                                        loader={imageLoader}
                                        src={`${movie?.poster_path}`}
                                        alt=""
                                        width="0"
                                        height="0"
                                        sizes="100em"
                                        style={{ width: "100%", height: "auto" }}
                                        onClick={clickImg}
                                    />
                                </div>
                            )}
                            {movie.belongs_to_collection?.poster_path && (
                                <div className="border border-slate-300 invert-0 hover:invert">
                                    <Image
                                        loader={imageLoader}
                                        src={`${movie.belongs_to_collection?.poster_path}`}
                                        alt=""
                                        width="0"
                                        height="0"
                                        sizes="100em"
                                        style={{ width: "100%", height: "auto" }}
                                        onClick={clickImg}
                                    />
                                </div>
                            )}
                            {movie.belongs_to_collection?.backdrop_path && (
                                <div className="border border-slate-300 invert-0 hover:invert">
                                    <Image
                                        loader={imageLoader}
                                        src={`${movie.belongs_to_collection?.backdrop_path}`}
                                        alt=""
                                        width="0"
                                        height="0"
                                        sizes="100em"
                                        style={{ width: "100%", height: "auto" }}
                                        onClick={clickImg}
                                    />
                                </div>
                            )}
                        </div>
                        {/* 포스터 영역 */}
                        <div
                            className={`mt-2 cursor-pointer text-center rounded-sm px-6 p-5 font-extrabold leading-4 ${isFavorite === true
                                ? "text-yellow-500 bg-red-700"
                                : "text-white bg-sky-500"
                                }`}
                            onClick={favoriteFn}
                        >
                            {isFavorite === true ? "♡ MY PICK DELETE" : "♡ MY PICK ADD"}
                        </div>
                        <div className="mt-2 text-sm font-bold">
                            Runtime : {movie?.release_date} 분
                        </div>
                        <div className="flex flex-row mt-2 text-sm font-bold">
                            <svg
                                width="16"
                                height="20"
                                fill="currentColor"
                                className="text-blue-500"
                            >
                                <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z"></path>
                            </svg>
                            <div className="ml-1">{movie?.vote_average}</div>
                        </div>

                        <div className="mt-5 text-sm font-bold">줄거리 : </div>
                        <div className="mt-2 text-sm leading-8">{movie?.overview}</div>
                        <div>
                            {movie.homepage && (
                                <button
                                    onClick={goHome}
                                    className="bg-blue-400 text-white p-5 mt-5 text-sm transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none rounded-md invert:hover"
                                >
                                    HomePage
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col ml-5 shadow-lg shadow-indigo-500/50">
                        {movie?.production_companies?.map(
                            (v: ProductionCompanies) =>
                                v.logo_path && (
                                    <div className="py-1" key={v.id}>
                                        <Image
                                            loader={imageLoader}
                                            src={`${v.logo_path}`}
                                            alt=""
                                            width="0"
                                            height="0"
                                            sizes="100em"
                                            style={{ width: "30%", height: "auto" }}
                                        />
                                    </div>
                                )
                        )}
                    </div>
                </div>
            </div>
        )
    );
}
