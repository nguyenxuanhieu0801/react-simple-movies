import { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movies-layout page-container mb-10 pb-10">
        <h2 className="mb-10 font-body text-2xl capitalize text-white">Now playing</h2>
        <MovieList type="now_playing" />
      </section>
      <section className="movies-layout page-container mb-10 pb-10">
        <h2 className="mb-10 font-body text-2xl capitalize text-white">Top rated</h2>
        <MovieList type="top_rated" />
      </section>
      <section className="movies-layout page-container mb-10 pb-10">
        <h2 className="mb-10 font-body text-2xl capitalize text-white">Top rated</h2>
        <MovieList type="popular" />
      </section>
    </Fragment>
  );
};

export default HomePage;
