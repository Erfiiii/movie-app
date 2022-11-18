import React, { PropsWithChildren } from "react";
import styles from "../styles/Header.module.css";

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function Header(props: Props) {
  return (
    <header className={styles.header}>
      <div>
        <h1>Movie App</h1>
      </div>
    </header>
  );
}
