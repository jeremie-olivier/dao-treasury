import "./App.css";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route exact path=":address" element={<Dashboard />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
