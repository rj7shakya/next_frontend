"use client";
import React from "react";
import styles from "../events/[slug]/Event.module.css";
import { useRouter } from "next/navigation";
import { API_URL } from "../config";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const Delete = ({ evt }) => {
  const router = useRouter();

  const onDelete = async (e) => {
    if (confirm("Are you sure ?")) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.message);
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <span className={styles.delete} onClick={onDelete}>
      <FaTimes /> Delete Event
    </span>
  );
};

export default Delete;
