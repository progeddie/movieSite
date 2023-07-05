import { MouseEvent } from "react";
import { useRouter } from "next/router";
import style from "@styles/Home.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    chacheSelectState,
    chachePageState,
    chacheFavoriteState,
} from "@global/listState";
import { Movie, Genre } from "@type/movie";

export default function ListItem({
    movie,
    genreArr,
    pathname,
}: {
    movie: any;
    genreArr: any;
    pathname: string;
}) {
    const router = useRouter();
    const [select, setSelect] = useRecoilState(chacheSelectState);
    const [page, setPage] = useRecoilState(chachePageState);

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        router.push(`movies/${movie.id}`);
        setSelect(movie.id);
        setPage(pathname);
    };
    return (
        <article className="flex items-start space-x-6 p-6" onClick={onClick}>
            <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
                width="60"
                height="88"
                className="flex-none rounded-md bg-slate-100 invert-0 hover:invert"
            />
            <div className="min-w-0 relative flex-auto">
                <h2 className="font-semibold text-slate-500 truncate pr-20">
                    {/* <Link href={`movies/${movie.id}`}> */}
                    {movie.title} ({movie.original_title}){/* </Link> */}
                </h2>
                <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                    <div className="absolute top-0 right-0 flex items-center space-x-1">
                        <dt className="text-sky-500">
                            <span className="sr-only">Star rating</span>
                            <svg width="16" height="20" fill="currentColor">
                                <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                            </svg>
                        </dt>
                        <dd>{movie.vote_average}</dd>
                    </div>
                    <div className="ml-2">
                        <dt className="sr-only">Year</dt>
                        <dd>
                            {movie.genre_ids?.map((v: any) => (
                                <span className={style.gen} key={v}>
                                    {genreArr[v]}
                                </span>
                            ))}
                        </dd>
                    </div>
                    <div className="flex-none w-full mt-2 font-normal">
                        <dt className="sr-only">ReleaseDate</dt>
                        <dd className="text-slate-500">{movie.release_date}</dd>
                    </div>
                </dl>
            </div>
        </article>
    );
}
