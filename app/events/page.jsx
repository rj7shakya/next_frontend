import { API_URL, PER_PAGE } from "../config";
import EventItem from "../components/EventItem";
import Pagination from "../components/Pagination";

export default async function EventsPage(props) {
  const { events, page, total } = await getEvents(props?.searchParams?.page);

  return (
    <div>
      {/* <h1>Upcoming Events</h1> */}
      {events?.length === 0 && <h3>No events to show</h3>}
      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt?.attributes} />
      ))}
      <Pagination page={page} total={total} />
    </div>
  );
}

export async function getEvents(page = 1) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const res = await fetch(
    `${API_URL}/api/events?populate=*&sort=date:ASC&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`,
    {
      cache: "no-store",
    }
  );
  const events = await res.json();
  return {
    events: events?.data,
    page: +page,
    total: events?.meta?.pagination?.total,
  };
}
