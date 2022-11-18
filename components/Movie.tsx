import Image, { ImageLoaderProps } from "next/image";
import React, { PropsWithChildren } from "react";
import styles from "../styles/Movie.module.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500"

interface OwnProps {
  movie: any;
}

type Props = PropsWithChildren<OwnProps>;

function getClassByRate(vote: number) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${IMAGE_URL}/${src}?w=${width}&q=${quality || 75}`;
};

export function Movie(props: Props) {
  const { movie } = props;
  return (
    <>
      <div className={styles.movie}>
        <Image
          src={IMAGE_URL + movie.poster_path}
          alt={movie.title}
          loader={imageLoader}
          width={300}
          height={400}
        />
        <div className={styles.movieInfo}>
          <h3>{movie.title}</h3>
          <span className={styles[getClassByRate(movie.vote_average)]}>
            {movie.vote_average}
          </span>
        </div>
        <div className={styles.overview}>
          <h3>Overview:</h3>
          {movie.overview}
          <h3>Number of votes:</h3>
          {movie.vote_count}
          <h3>Release Date:</h3>
          {movie.release_date}
        </div>
      </div>
    </>
  );
}
