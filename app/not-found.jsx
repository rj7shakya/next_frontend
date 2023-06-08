import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className={styles.error}>
      <h1>
        {" "}
        <FaExclamationTriangle /> 404
      </h1>
      <h4>Sorry, there is nothing here.</h4>
      <Link href="/">Go Back Home</Link>
    </div>
  );
};

export default NotFoundPage;
