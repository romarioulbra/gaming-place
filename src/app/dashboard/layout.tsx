// import Navbar from "../components/MenuNavbar";
import NavbarPerfil from "../components/NavBarPerfil";
// import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({ children}) {
  return (
    <div>
      {/* <Navbar/> */}
      <NavbarPerfil/>
      <main className="">
        {/* <SessionProvider > */}
          {children}
        {/* </SessionProvider> */}
      </main> 
    </div>
  );
}
