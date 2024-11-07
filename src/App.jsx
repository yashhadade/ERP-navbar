import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
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
import EditTemporaryClient from "./pages/EditTemporaryClient";
import Survey from "./components/Forms/Survey";
import Premises from "./components/Forms/Premises";
import Buildings from "./components/Forms/Buildings";
import Basement from "./components/Forms/Basement";
import DriverRoom from "./components/Forms/DriverRoom";
import Toilet from "./components/Forms/Toilet";
import AddClient from "./components/Client/AddClient";
import AdminPannel from "./components/Massmailer/Admin/AdminPannel";

function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/order" element={<Order />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/addClient" element={<AddClient/>}/>
          <Route path="/editTemporaryClient/:clintId" element={<EditTemporaryClient/>}/>
          <Route path="/temporarySite" element={<TemporarySite/>}/>
          <Route path="/temporaryDesignantion" element={<TemporaryDesignantion/>}/>
          <Route path="/salaryHead" element={<SalarayHead/>}/>
          <Route path="/salaryComponents" element={<SalarayComponents/>}/>
          <Route path="/machinery" element={<Machinery/>}/>
          <Route path="/material" element={<Material/>}/>
          <Route path="/survey" element={<Survey />} />
          <Route path="/premises" element={<Premises />} />
          <Route path="/buildings" element={<Buildings />} />
          <Route path="/basement" element={<Basement />} />
          <Route path="/driverroom" element={<DriverRoom />} />
          <Route path="/toilet" element={<Toilet />} />
          <Route path="/adminPannel" element={<AdminPannel/>} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
