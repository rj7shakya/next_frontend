import Link from "next/link";
import { API_URL } from "./config";
import EventItem from "./components/EventItem";

export default async function Home() {
  const events = await getEvents();
  return (
    <div>
      <h1>Upcoming Events</h1>
      {events?.length === 0 && <h3>No events to show</h3>}
      {events?.slice(0, 3).map((evt) => (
        <EventItem key={evt.id} evt={evt?.attributes} />
      ))}
      {events?.length > 0 && (
        <Link href="/events" className="btn-secondary">
          View All Events
        </Link>
      )}
    </div>
  );
}

export async function getEvents() {
  const res = await fetch(
    `${API_URL}/api/events?populate=*&pagination[start]=0&pagination[limit]=3&sort=date:ASC`,
    { cache: "no-store" }
  );
  const events = await res.json();
  return events?.data;
}
