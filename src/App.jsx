// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

// PAGES
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import Show from "./Pages/Show";
import New from "./Pages/New";
import Loading from "./Components/Loading ";
import FourOFour from "./Pages/FourOFour";


// COMPONENTS
import NavBar from "./Components/NavBar";

function App() {
  return (
   <div className="App">
    <Router>
      <NavBar/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hypnotize-me" element={<Loading />} />
          <Route path="/logbook" element={<Index />} />
          <Route path="/logbook/:id" element={<Show />} />
          <Route path="/logbook/new" element={<New />} />
          <Route path="*" element={<FourOFour />} />
          </Routes>
      </main> 
    </Router>
   </div>
  )
}

export default App;
