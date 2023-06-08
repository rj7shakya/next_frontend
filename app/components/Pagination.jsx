import Link from "next/link";
import { PER_PAGE } from "../config";

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <span className="btn-secondary">Prev</span>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <span className="btn-secondary">Next</span>
        </Link>
      )}
    </>
  );
}
