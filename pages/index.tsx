import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Filters } from "../components/Filters";
import { Header } from "../components/Header";
import { Movies } from "../components/Movies";
import Pagination from "../components/Pagination";
import styles from "../styles/Home.module.css";
import { URL } from "./constants";
import { getInitailQueryString, updateQueryStringParameter } from "../utils";

const Home: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [queryString, setQueryString] = useState<string>(getInitailQueryString);

  useEffect(() => {
    setLoading(true);
    fetch(URL + queryString)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setCurrentPage(response.page);
        setTotalPages(response.total_pages);
        setMovies([...response.results]);
        setLoading(false);
        router.replace(`?${queryString}`);
      });
  }, [queryString]);

  const onApplyFilters = useCallback(
    (
      year: string | undefined,
      voteGte: string | undefined,
      voteLte: string | undefined
    ) => {
      const qs1 =
        year !== undefined
          ? updateQueryStringParameter(queryString, "year", year)
          : queryString;
      const qs2 =
        voteGte !== undefined
          ? updateQueryStringParameter(qs1, "vote_average.gte", voteGte)
          : qs1;
      const newQueryString =
        voteLte !== undefined
          ? updateQueryStringParameter(qs2, "vote_average.lte", voteLte)
          : qs2;
      setQueryString(newQueryString);
    },
    [queryString]
  );

  const onPageChange = useCallback(
    (page: string) => {
      const newQueryString = updateQueryStringParameter(
        queryString,
        "page",
        page
      );
      setQueryString(newQueryString);
    },
    [queryString]
  );

  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Filters onApplyFilters={onApplyFilters} />
        {loading ? (
          <div className={styles["loading"]}>Loading...</div>
        ) : (
          <Movies movies={movies} />
        )}
        {!loading && (
          <Pagination
            onPageChange={onPageChange}
            totalPages={totalPages}
            siblingCount={1}
            currentPage={currentPage}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
