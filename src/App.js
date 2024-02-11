import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Views/About/about';
import Contact from './Views/Contact/Contact';
import Home from './Views/Home/home';
import Login from './Views/LogIn/login';
import Services from './Views/Services/services';
import Project from './Views/Project/project';
import Projectdetails from './Views/Projectdetails/projectdetails';
import Signup from './Views/SignUp/signup';
import Addproject from './Views/Addproject/addproject';
import Addtask from './Views/Addtask/addtask';
import Projectlist from './Views/projectlist/projectlist';
import Tasklist from './Views/tasklist/tasklist';
import Addholiday from './Views/Addholiday/addholiday';
import Holidaylist from './Views/Holidaylist/holidaylist';
import Employeelist from './Views/Employeelist/employeelist';
import Managerlist from './Views/Managerlist/managerlist';
import Formmanager from './Views/FormManager/formmanager';
import Authentication from './Views/Authentication/authentication';
import Dmholiday from './Views/Dmholiday/dmholiday';
import Taskemmployee from './Views/Taskemployee/taskemmployee';
import Profile from './Views/Profile/profile';
import Updateprofile from './Views/Updateprofile/updateprofile';
import Listprojectmanager from './Views/ListprojectManager/listprojectmanager';
import Listtaskemploye from './Views/Home/Listtaskemploye/listtaskemploye';
import Taskdetails from './Views/Taskdetails/taskdetails';
import Addstatus from './Views/Addstatus/addstatus';
import Addholidaytype from './Views/Addholidaytype/addholidaytype';
import Listtypes from './Views/Listtypes/listtypes';
import Liststatus from './Views/Liststatus/liststatus';
function App() {
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/project' element={<Project/>}/> 
      <Route path='/projectdetails/:id' element={<Projectdetails/>}/>
      <Route path='/contact' element={<Contact/>}/> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/> 
      <Route path='/authentication' element={<Authentication/>}/>
      <Route path='/formmaager' element={<Formmanager/>}/> 
      <Route path='/addproject' element={<Addproject/>}/> 
      <Route path='/addtask' element={<Addtask/>}/>
      <Route path='/addholiday' element={<Addholiday/>}/>
      <Route path='/projectlist' element={<Projectlist/>}/>
      <Route path='/taskdetails/:id' element={<Taskdetails/>}/>
      <Route path='/tasklist' element={<Tasklist/>}/>  
      <Route path='/holidaylist' element={<Holidaylist/>}/>
      <Route path='/listtypes' element={<Listtypes/>}/>
      <Route path='/liststatus' element={<Liststatus/>}/>
      <Route path='/dmholiday' element={<Dmholiday/>}/>
      <Route path='/employeelist' element={<Employeelist/>}/>
      <Route path='/managerlist' element={<Managerlist/>}/>
      <Route path='/taskemployee' element={<Taskemmployee/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/updateprofile/:id' element={<Updateprofile/>}/>
      <Route path='/listprojectmanager/:id' element={<Listprojectmanager/>}/>
      <Route path='/listtaskemploye/:id' element={<Listtaskemploye/>}/>
      <Route path='/addstatus' element={<Addstatus/>}/>
      <Route path='/addholidaytype' element={<Addholidaytype/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
