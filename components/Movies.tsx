import React, { PropsWithChildren } from "react";
import { Movie } from "./Movie";
import styles from "../styles/Movies.module.css";

interface OwnProps {
  movies: any[];
}

type Props = PropsWithChildren<OwnProps>;

export function Movies(props: Props) {
  const { movies } = props;
  return (
    <div className={styles["container"]}>
      {movies.length === 0 ? (
        <>No Movies, Change your filters.</>
      ) : (
        movies.map((item: any) => <Movie movie={item} key={item.id} />)
      )}
    </div>
  );
}
