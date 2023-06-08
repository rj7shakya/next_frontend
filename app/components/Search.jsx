"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import styles from "./Search.module.css";

const Search = () => {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTerm("");
    router.push(`/events/search?term=${term}`);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
};

export default Search;
