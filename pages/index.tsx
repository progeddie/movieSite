import { useRouter } from "next/router";
import ListPage from "@components/templates/ListPage";
import { Movie, Genre } from "@type/movie";

export default function Home({ results }: { results: any }) {
  const router = useRouter();
  return (
    <>
      <ListPage props={results} pathname={router.pathname} />
    </>
  );
}

// 영화 목록과 장르를 두가지 방법으로 호출해봄
export async function getServerSideProps() {
  // rewrites 로 apikey 숨김
  const process1 = async (): Promise<Movie[]> => {
    const { results } = await (
      await fetch(`http://localhost:3000/ko/api/movies`)
    ).json();
    return results;
  };

  const process2 = async (): Promise<Genre[]> => {
    const { genres } = await (
      await fetch(`http://localhost:3000/ko/api/genres`)
    ).json();
    return genres;
  };

  // 비동기 방식으로 동시호출
  let results = await Promise.all([process1(), process2()]).then(
    async (res) => {
      return { movieList: res[0], movieGenre: res[1] };
    }
  );

  // 결과값 반환
  return {
    props: {
      results,
    },
  };
}
