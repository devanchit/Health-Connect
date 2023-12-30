// import logo from './logo.svg';
import './App.css';
import DateTimePicker from './components/DateTimePicker';
import { Route, Routes } from 'react-router-dom';
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
          </Routes>
        </main>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;


// db user:
//username : devanshchitransh
//password:   KBiNQfcRCuWNfoPe

// mongodb+srv://devanshchitransh:<password>@cluster0.1oy6pik.mongodb.net/?retryWrites=true&w=majority