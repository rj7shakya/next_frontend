import React from "react";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { API_URL } from "@/app/config";
import EditPageComponent from "@/app/components/Edit";
import { cookies } from "next/headers";

const EditPage = async (props) => {
  const id = props?.params?.id;

  const nextCookies = cookies();
  const token = nextCookies.get("jwt");

  const evt = await getEventDetails(id);

  return (
    <div>
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <EditPageComponent evt={evt} />
    </div>
  );
};

const getEventDetails = async (id) => {
  const res = await fetch(
    `${API_URL}/api/events?populate=*&filters[id]=${id}`,
    { cache: "no-store" }
  );
  const event = await res.json();
  return { id: event?.data[0]?.id, ...event?.data[0]?.attributes };
};

export default EditPage;
