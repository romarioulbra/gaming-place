import NavbarPerfil from "../components/NavBarPerfil";
// import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({ children}) {
  return (
    <div>
      <NavbarPerfil/>
      <main className="">
        {/* <SessionProvider > */}
          {children}
        {/* </SessionProvider> */}
      </main> 
    </div>
  );
}
