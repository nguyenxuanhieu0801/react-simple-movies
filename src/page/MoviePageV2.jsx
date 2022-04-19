import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import { v4 } from "uuid";
import { tmdbAPI, fetcher } from "../components/apiConfig/config";
import Button from "../components/button/Button";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import useSWRInfinite from "swr/infinite";

const itemsPerPage = 20;

const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const { data, error, size, setSize } = useSWRInfinite((index) => url.replace("page=1", `page=${index + 1}`), fetcher);

  const loading = !data && !error;
  const isEmpty = data?.[0]?.result.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.result.length < itemsPerPage);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);
  const movies = data ? data.reduce((a, b) => a.concat(b.result), []) : [];
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <div className="page-container py-10">
      <div className="mb-10 flex">
        <div className="flex-1">
          <input
            type="text"
            className="w-full bg-slate-800 p-4 text-white outline-none"
            placeholder="Type here to search..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="bg-primary p-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(20).fill(0).map(() => (
            <MovieCardSkeleton key={v4()} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading && movies.length > 0 && movies.map((item) => <MovieCard key={item.id} item={item}></MovieCard>)}
      </div>

      <div className="mt-10 text-center">
        <Button
          className={`${isReachingEnd ? "bg-slate-300" : ""}`}
          onClick={() => (isReachingEnd ? {} : setState(size + 1))}
          disabled={isReachingEnd}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default MoviePage;
