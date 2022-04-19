import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../components/apiConfig/config";
import MovieCard from "../components/movie/MovieCard";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="py-10">
      <div className="relative h-[600px] w-full">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="h-full w-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="relative z-10 mx-auto -mt-[200px] h-[400px] w-full max-w-[800px] pb-10">
        <img src={tmdbAPI.imageOriginal(poster_path)} alt="" className="h-full w-full rounded-xl object-cover" />
      </div>
      <h1 className="mb-10 text-center text-3xl font-bold text-white">{title}</h1>
      {genres.length > 0 && (
        <div className="mb-10 flex items-center justify-center gap-x-5">
          {genres.map((item) => (
            <span className="rounded border border-primary px-4 py-2 text-primary" key={item.id}>
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="mx-auto mb-10 max-w-[600px] text-center text-sm leading-relaxed">{overview}</p>
      <MovieData type="credits" />
      <MovieData type="videos" />
      <MovieData type="similar" />
    </div>
  );
};

const MovieData = ({ type = "videos" }) => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  if (!data) return null;
  if (type === "creadits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    return (
      <div className="py-10">
        <h2 className="mb-10 text-center text-2xl">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item">
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt=""
                className="mb-3 h-[350px] w-full rounded-lg object-cover"
              />
              <h3 className="text-xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 2).map((item) => (
              <div className="" key={item.id}>
                <h3 className="mb-5 inline-block bg-secondary p-3 text-xl font-medium text-primary">{item.name}</h3>
                <div className="aspect-video w-full">
                  <iframe
                    width="942"
                    height="530"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full object-fill"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    if (type === "similar")
      return (
        <div className="py-10">
          <h2 className="mb-10 text-3xl font-medium">Similar Movies</h2>
          <div className="movie-list ">
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
  }
  return null;
};

// const MovieCredits = () => {
//   const { movieId } = useParams();
//   const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
//   if (!data) return null;
//   const { cast } = data;
//   if (!cast || cast.length <= 0) return null;

//   return (
//     <div className="py-10">
//       <h2 className="mb-10 text-center text-2xl">Casts</h2>
//       <div className="grid grid-cols-4 gap-5">
//         {cast.slice(0, 4).map((item) => (
//           <div className="cast-item">
//             <img
//               src={tmdbAPI.imageOriginal(item.profile_path)}
//               alt=""
//               className="mb-3 h-[350px] w-full rounded-lg object-cover"
//             />
//             <h3 className="text-xl font-medium">{item.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const MovieVideos = () => {
//   const { movieId } = useParams();
//   const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);

//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;

//   return (
//     <div className="py-10">
//       <div className="flex flex-col gap-10">
//         {results.slice(0, 2).map((item) => (
//           <div className="" key={item.id}>
//             <h3 className="mb-5 inline-block bg-secondary p-3 text-xl font-medium text-primary">{item.name}</h3>
//             <div className="aspect-video w-full">
//               <iframe
//                 width="942"
//                 height="530"
//                 src={`https://www.youtube.com/embed/${item.key}`}
//                 title="YouTube video player"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="h-full w-full object-fill"
//               ></iframe>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const MovieSimilar = () => {
//   const { movieId } = useParams();
//   const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);

//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;

//   return (
//     <div className="py-10">
//       <h2 className="mb-10 text-3xl font-medium">Similar Movies</h2>
//       <div className="movie-list ">
//         <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
//           {results.length > 0 &&
//             results.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <MovieCard item={item} />
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

export default MovieDetailsPage;
