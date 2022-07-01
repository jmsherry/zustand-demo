import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/system";

import theme from "./theme";

import Home from "./pages/Home";
import AddCar from "./pages/AddCar";
import UpdateCar from "./pages/UpdateCar";

import useStore, { fetchCars } from "./store/store";

function App() {
  const fetch = useStore(fetchCars);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return (
    <>
      <CssBaseline />
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="add" element={<AddCar />} />
              <Route path="update/:id" element={<UpdateCar />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
