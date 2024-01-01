import { Outlet } from "react-router-dom";
import Navbar from "./components/Nav";

export default function RootLayout() {
    <div>
    <Navbar/>

    <main>
        <Outlet/>
    </main>

    </div>
}