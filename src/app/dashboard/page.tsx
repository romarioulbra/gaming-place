import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-primary text-black py-4 mt-20">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold">Meu Dashboard</div>
          <div className="flex space-x-4 ">
            <a href="/usuarios/perfil" className="hover:text-secondary">
              Perfil
            </a>
            <a href="/logout" className="hover:text-secondary">
              Logout
            </a>
          </div>
        </div>
      </nav>

      {/* Boas-vindas */}
      <main className="flex flex-col items-center justify-center text-center mt-10">
        <h1 className="text-4xl font-extrabold text-text">
          Bem-vindo ao Dashboard!
        </h1>
        <p className="mt-4 text-lg text-text">
          Estamos felizes em ter você por aqui.
        </p>
      </main>
    </div>
  );
}
