import React, { PropsWithChildren, useMemo, useState } from "react";
import styles from "../styles/Filters.module.css";

const getFiltersInitailValues = () => {
  if (typeof window !== "undefined") {
    const urlSearchParam = new URLSearchParams(window.location.search);
    return {
      year: urlSearchParam.get("year") ?? undefined,
      voteGte: urlSearchParam.get("vote_average.gte") ?? undefined,
      voteLte: urlSearchParam.get("vote_average.lte") ?? undefined,
    };
  }
  return {};
};

interface OwnProps {
  onApplyFilters: (
    year: string | undefined,
    voteGte: string | undefined,
    voteLte: string | undefined
  ) => void;
}

type Props = PropsWithChildren<OwnProps>;

export function Filters(props: Props) {
  const initailValues = useMemo(getFiltersInitailValues, []);
  const [year, setYear] = useState(initailValues.year);
  const [voteGte, setVoteGte] = useState(initailValues.voteGte);
  const [voteLte, setVoteLte] = useState(initailValues.voteLte);

  const onChangeYear = (e: any) => {
    setYear(e.target.value);
  };
  const onChangeVoteGte = (e: any) => {
    setVoteGte(e.target.value);
  };
  const onChangeVoteLte = (e: any) => {
    setVoteLte(e.target.value);
  };
  const onApply = (e: any) => {
    e.preventDefault();
    props.onApplyFilters(year, voteGte, voteLte);
  };
  return (
    <>
      <div className={styles["filters"]}>
        <div>
          Year:
          <input
            type="number"
            className={styles["filter-input"]}
            onChange={onChangeYear}
            value={year}
          />
        </div>
        <div>
          <div>
            Rate less than:
            <input
              type="number"
              className={styles["filter-input"]}
              onChange={onChangeVoteLte}
              value={voteLte}
            />
            Rate more than:
            <input
              type="number"
              className={styles["filter-input"]}
              onChange={onChangeVoteGte}
              value={voteGte}
            />
          </div>
        </div>
        <button onClick={onApply} className={styles["filter-Button"]}>
          Apply
        </button>
      </div>
    </>
  );
}
