import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditTask from "./components/tasks/EditTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edittask/:id" element={<EditTask />} />
      </Routes>
    </>
  );
}

export default App;
