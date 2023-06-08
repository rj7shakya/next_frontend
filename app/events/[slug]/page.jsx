import { API_URL } from "@/app/config";
import { FaPencilAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import styles from "./Event.module.css";
import Link from "next/link";
import Image from "next/image";
import Delete from "@/app/components/Delete";

const EventPage = async (props) => {
  const slug = props?.params?.slug;
  const evt = await getEventDetails(slug);

  return (
    <div className={styles.event}>
      <div className={styles.controls}>
        <Link href={`/events/edit/${evt?.id}`}>
          <FaPencilAlt /> Edit Event
        </Link>

        <Delete evt={evt} />
      </div>
      <span>
        {new Date(evt?.date)?.toLocaleDateString("en-US")} at {evt.time}
      </span>
      <h1>{evt.name}</h1>
      <ToastContainer />
      {evt.image && (
        <div className={styles.image}>
          {evt.image && (
            <Image
              src={evt?.image?.data?.attributes?.formats?.thumbnail?.url}
              width={960}
              height={600}
              alt="Can't Load"
            />
          )}
        </div>
      )}

      <h3>Performers:</h3>
      <p>{evt.performers}</p>
      <h3>Description:</h3>
      <p>{evt.description}</p>
      <h3>Venue: {evt.venue}</h3>
      <p>{evt.address}</p>

      <Link href="/events" className={styles.back}>
        {"<"} Go Back
      </Link>
    </div>
  );
};

const getEventDetails = async (slug) => {
  const res = await fetch(
    `${API_URL}/api/events?populate=*&filters[slug]=${slug}`,
    { cache: "no-store" }
  );
  const event = await res.json();
  return { id: event?.data[0]?.id, ...event?.data[0]?.attributes };
};

export default EventPage;
