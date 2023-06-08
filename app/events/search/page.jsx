"use client";
import { API_URL } from "../../config";
import EventItem from "../../components/EventItem";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import qs from "qs";

export default async function EventsPage() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const events = await getEvents(term);

  return (
    <div>
      <h1>Search Results for {term}: </h1>
      <Link href="/events">Go Back</Link>
      {events?.length === 0 && <h3>No events to show</h3>}
      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt?.attributes} />
      ))}
    </div>
  );
}

export async function getEvents(term) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $contains: term,
            },
          },
          {
            performers: {
              $contains: term,
            },
          },
          {
            description: {
              $contains: term,
            },
          },
          {
            venue: {
              $contains: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const res = await fetch(`${API_URL}/api/events?populate=*&${query}`, {
    cache: "no-store",
  });
  const events = await res.json();
  return events?.data;
}
