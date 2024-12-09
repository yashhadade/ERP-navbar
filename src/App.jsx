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
import Massmailer from "./components/Massmailer/Admin/Massmailer";
import AddSite from "./components/Client/AddSite";

import StoreForm from "./components/Forms/StoreForm";
import LobbiesForm from "./components/Forms/LobbiesForm";
import LoungeForm from "./components/Forms/LoungeForm";
import ManagerForm from "./components/Forms/ManagerForm";
import RestingForm from "./components/Forms/RestingForm";
import StaircaseForm from "./components/Forms/StaircaseForm";
import ElevatorForm from "./components/Forms/ElevatorForm";
import CompoundForm from "./components/Forms/CompoundForm";
import EscalatorForm from "./components/Forms/EscalatorForm";
import TerraceForm from "./components/Forms/TerraceForm";

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
          <Route path="/addsite" element={<AddSite/>}/>
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
          <Route path="/massmailer" element={<Massmailer/>}/>
          <Route path="/storeForm" element={<StoreForm/>}/>
          <Route path="/lobbiesForm" element={<LobbiesForm/>}/>
          <Route path="/loungeForm" element={<LoungeForm/>}/>
          <Route path="/managerForm" element={<ManagerForm/>}/>
          <Route path="/restingForm" element={<RestingForm/>}/>
          <Route path="/staircaseForm" element={<StaircaseForm/>}/>
          <Route path="/elevatorForm" element={<ElevatorForm/>}/>
          <Route path="/escalatorForm" element={<EscalatorForm/>}/>
          <Route path="/compoundForm" element={<CompoundForm/>}/>
          <Route path="/terraceForm" element={<TerraceForm/>}/>
         
          

          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
