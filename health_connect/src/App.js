// import logo from './logo.svg';
import './App.css';
import DateTimePicker from './components/DateTimePicker';
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Signin from './pages/SignIn';
//import { SignUp } from './pages/SignUp';
// import Navbar from './components/Navbar';÷
import Signup from './pages/SignUp';
import SignupPage from './pages/SignUp';
import { UserContextProvider } from './UserContext';
import Navbar from './components/Nav';
import { Chat } from './pages/Chat';
import Admin from './pages/Admin';
import Home from './pages/Home';
import ReportShare from './pages/ReportShare';
import PatientCard from './pages/DoctorHome';
import DoctorLoginPage from './pages/DoctorLogin';
//import RootLayout from './RootLayout';


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
      
//             <Route index  element={<Signin />} />
//             <Route path="/signin" element={<Signin />} />
//             <Route path="/signup" element={<SignupPage />} />
//             {/* <Route path="/chat" element={<Chat room="room1" />} /> */}
//             <Route path="/admin" element={<Admin />} />
//             <Route path="/home" element={<Home />} />
          
      
//     </Route>
//   )
// )


function App() {
  return (
    <UserContextProvider>


            <BrowserRouter>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Signin />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/signup" element={<SignupPage />} />
                  {/* <Route path="/chat" element={<Chat room="room1" />} /> */}
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/reportshare" element={<ReportShare />} />
                  <Route path="/doctorHome" element={<PatientCard />} />
                  <Route path="/doctorlogin" element={<DoctorLoginPage />} />
                </Routes>
              </main>
            </BrowserRouter>


       {/* <RouterProvider router={router} /> */}
    </UserContextProvider>
  );
}

export default App;


// db user:
//username : devanshchitransh
//password:   KBiNQfcRCuWNfoPe

// mongodb+srv://devanshchitransh:<password>@cluster0.1oy6pik.mongodb.net/?retryWrites=true&w=majority