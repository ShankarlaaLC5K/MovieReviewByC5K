import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { MovieDetails } from "./components/MovieDetails";

export default function App() {
  return (
    <>
      <Dashboard /> 
      <Routes>
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}