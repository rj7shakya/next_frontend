import React from "react";

import styles from "./EventItem.module.css";
import Image from "next/image";
import Link from "next/link";

const EventItem = ({ evt }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.image ? evt?.image?.data?.attributes?.formats?.small?.url : null
          }
          width={170}
          height={100}
          alt="Can't Load"
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt?.date)?.toLocaleDateString("en-US")} at {evt?.time}
        </span>
        <h3>{evt?.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt?.slug}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
