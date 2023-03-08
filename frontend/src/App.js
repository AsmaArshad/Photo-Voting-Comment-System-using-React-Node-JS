import Home from "./Components/Home";
import AddPhoto from "./Components/AddPhoto";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/addphoto" element={<AddPhoto />} />
      </Routes>

    </div>
  );
}

export default App;
