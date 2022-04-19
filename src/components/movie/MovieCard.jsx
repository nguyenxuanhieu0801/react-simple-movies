import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../apiConfig/config";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
  const { id, title, vote_average, release_date, poster_path } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex h-full select-none flex-col rounded-lg bg-slate-800 p-3 text-white">
      <img src={tmdbAPI.image500(poster_path)} alt="" className="mb-5 h-[250px] w-full rounded-lg object-cover" />
      <div className="flex flex-1 flex-col">
        <h3 className="mb-3 text-xl font-bold">{title}</h3>
        <div className="mb-10 flex items-center justify-between text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movies/${id}`)} bgColor="secondary">
          Watch Now
        </Button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
  }),
};

const FallbackComponent = () => {
  return <p className="bg-red-50 text-red-400">Something went wrong with this component</p>;
};

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex h-full select-none flex-col rounded-lg bg-slate-800 p-3 text-white">
      <LoadingSkeleton height="250px" radius="8px" />
      <div className="flex flex-1 flex-col">
        <LoadingSkeleton height="20px" />
        <div className="mb-10 flex items-center justify-between text-sm opacity-50">
          <span>
            <LoadingSkeleton width="50px" height="10px" />
          </span>
          <span>
            <LoadingSkeleton width="30px" height="10px" />
          </span>
        </div>
        <LoadingSkeleton width="50px" height="40px" radius="6px" />
      </div>
    </div>
  );
};
