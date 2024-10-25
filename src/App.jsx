import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/MainContent/Content";
import { Route, Routes } from "react-router-dom";
import OrchidDetail from "./components/OrchidDetail";
import SpecialOrchid from "./components/SpecialOrchid";
import About from "./components/About";
import Contact from "./components/Contact";
import News from "./components/News";
import Protected from "./components/Protected";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <Routes>
        <Route path='/fer-lab1/' element={<Content />} />
        <Route path='/fer-lab1/natural' element={<SpecialOrchid />} />
        <Route path='/fer-lab1/:id' element={<OrchidDetail />}></Route>
        <Route path='/fer-lab1/news' element={<News />}></Route>
        <Route path='/fer-lab1/about' element={<About />} />
        <Route path='/fer-lab1/contact' element={<Contact />} />
        <Route
          path='/fer-lab1/dashboard'
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
