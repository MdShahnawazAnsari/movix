import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { fetchDataFromApi } from "./utils/api";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchRresult from "./pages/searchResult/SearchResult";
import Person from "./pages/person/Person";

function App() {
  const dispatch = useDispatch();

  const { url } = useSelector((state) => state.home);
  // console.log(url);

  const fetchApiConfig = async () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  // for storing genres to the redux store

  const genresCall = async () => {
    let promise = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promise.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promise);
    // console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/details/:mediaType/:id" element={<Details />} />
        <Route exact path="/search/:query" element={<SearchRresult />} />
        <Route exact path="/explore/:mediaType" element={<Explore />} />
        <Route exact path="/person/:id" element={<Person />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
