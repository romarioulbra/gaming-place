// "use client"
// import "./globals.css";
// import Navbar from "./components/MenuNavbar";
// import Footer from "./components/Rodape";
// import { SessionProvider } from "next-auth/react";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="pt-br" >
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com"/>
//         <link rel="preconnect" href="https://fonts.gstatic.com"/>
//         <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet"/>
//       </head> 
//       <body>
//         <SessionProvider>
//           <Navbar/>
//           {children}
//           <Footer/>
//         </SessionProvider> 
//       </body>
//     </html>
//   );
// }


"use client";

import "./globals.css";
import Navbar from "./components/MenuNavbar";
import Footer from "./components/Rodape";
import { SessionProvider } from "next-auth/react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={orbitron.className}>
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
