import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";

const HomePage = lazy(() => import("./page/HomePage"));
const MovieDetailsPage = lazy(() => import("./page/MovieDetailsPage"));
const MoviePage = lazy(() => import("./page/MoviePage"));

const App = () => {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main />}>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <HomePage />
                </>
              }
            />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
