import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/MainContent/Content";
import { Route, Routes } from "react-router-dom";
import OrchidDetail from "./components/OrchidDetail";
import SpecialOrchid from "./components/SpecialOrchid";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/fer-lab1/' element={<Content />} />
        <Route path='/fer-lab1/natural' element={<SpecialOrchid />} />
        <Route path='/fer-lab1/:id' element={<OrchidDetail />}></Route>
        <Route path='/fer-lab1/about' element={<About />} />
        <Route path='/fer-lab1/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
