import Image from "next/image";

export default function Perfil() {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-indigo-900 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl p-6 bg-purple-900 text-white rounded-xl shadow-lg space-y-6">
        {/* Perfil */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={`/img/homem.png`}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full border-4 border-pink-500"
              width={100}
              height={100}
            />
            <div>
              <h2 className="text-2xl font-bold">Zaya Madson</h2>
              <p className="text-sm text-gray-300">zaya@gmail.com.br</p>
              <p className="text-sm text-gray-300">Palmas, Tocantins</p>
            </div>
          </div>
          <div>
            <p className="text-sm">Troféus: <span className="font-bold">5</span></p>
            <p className="text-sm">Pontos: <span className="font-bold text-yellow-400">2.6k</span></p>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div>
          <p className="text-sm mb-1">Progresso</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full"
              style={{ width: "99%" }}
            ></div>
          </div>
        </div>

        {/* Emblemas */}
        <div>
          <h3 className="text-lg font-bold">Emblemas</h3>
          <div className="flex space-x-4 mt-2">
            {["1", "2", "3", "4", "5"].map((item) => (
              <Image
                key={item}
                src={`/img/menin.png`}
                alt={`Emblema ${item}`}
                className="w-12 h-12 rounded-full"
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>

        {/* Ranking */}
        <div className="bg-purple-800 p-4 rounded-xl">
          <h3 className="text-lg font-bold">Ranking</h3>
          <ul className="mt-2 space-y-2">
            {[
              { name: "Jaiminho", points: 1320 },
              { name: "Zaya", points: 999 },
              { name: "Dona Florinda", points: 950 },
              { name: "Chaves", points: 740 },
              { name: "Michel Teló", points: 610 },
            ].map((user, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-purple-700 p-2 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <Image
                     src={`/img/menin.png`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                    width={100}
                    height={100}
                  />
                  <span>{user.name}</span>
                </div>
                <span className="text-yellow-400 font-bold">
                  {user.points} 🏆
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botões de Ação */}
        <div className="flex space-x-4">
          <button className="flex-1 bg-pink-600 py-2 rounded-lg hover:bg-pink-700">
            Adicionar amigos
          </button>
          <button className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700">
            Enviar sugestão
          </button>
        </div>
      </div>
    </div>
  );
}
