import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CreateNumber from "./Screens/CreateNumber";
import Home from "./Screens/Home";

function App() {
  
  return (
    <div>
    <BrowserRouter>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreateNumber" element={<CreateNumber />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>

    </div>
  );
}

export default App;
