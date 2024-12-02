import { FaUser, FaGamepad, FaLayerGroup } from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen mt-16 flex flex-col bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500">
      {/* Navbar */}
      <header className="bg-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">Painel Administrativo</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-indigo-600 hover:bg-indigo-800 px-4 py-2 rounded-md text-sm">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-indigo-800 text-white">
          <nav className="mt-10 space-y-4 px-4">
            <a
              href="#usuarios"
              className="flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
            >
              <FaUser className="mr-2" />
              <span>Usuários</span>
            </a>
            <a
              href="#jogos"
              className="flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
            >
              <FaGamepad className="mr-2" />
              <span>Jogos</span>
            </a>
            <a
              href="#categorias"
              className="flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
            >
              <FaLayerGroup className="mr-2" />
              <span>Categorias</span>
            </a>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 bg-white shadow-2xl">
          <div className="container mx-auto px-6 py-8">
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Bem-vindo ao Painel Administrativo
            </h2>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card - Usuários */}
              <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md flex items-center">
                <FaUser className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Usuários</h3>
                  <p className="text-sm">Gerencie todos os usuários do sistema.</p>
                </div>
              </div>

              {/* Card - Jogos */}
              <div className="bg-pink-600 text-white p-6 rounded-lg shadow-md flex items-center">
                <FaGamepad className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Jogos</h3>
                  <p className="text-sm">Adicione, edite ou exclua jogos.</p>
                </div>
              </div>

              {/* Card - Categorias */}
              <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md flex items-center">
                <FaLayerGroup className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Categorias</h3>
                  <p className="text-sm">Organize os jogos em categorias.</p>
                </div>
              </div>
            </div>

            {/* Detalhes */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visão Geral</h3>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-gray-700">
                  Aqui você pode gerenciar todas as informações do sistema, incluindo usuários,
                  jogos e categorias. Use o menu lateral para navegar entre as seções.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
