import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import TemporaryClient from "./pages/TemopraryClient";
import TemporarySite from "./pages/TemporarySite";
import TemporaryDesignantion from "./pages/TemporaryDesignantion";
import SalarayHead from "./pages/SalarayHead";
import SalarayComponents from "./pages/SalaryComponents";
import Machinery from "./pages/Machinery";
import Material from "./pages/Material";



function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/order" element={<Order />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/temporaryClient" element={<TemporaryClient/>}/>
          <Route path="/temporarySite" element={<TemporarySite/>}/>
          <Route path="/temporaryDesignantion" element={<TemporaryDesignantion/>}/>
          <Route path="/salaryHead" element={<SalarayHead/>}/>
          <Route path="/salaryComponents" element={<SalarayComponents/>}/>
          <Route path="/machinery" element={<Machinery/>}/>
          <Route path="/material" element={<Material/>}/>

          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
