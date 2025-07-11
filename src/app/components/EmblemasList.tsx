import Image from "next/image";

export default function EmblemasList({ emblemas, handleOpenModal }) {
  return (
    <div className="p-6 bg-purple-800 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        {emblemas.some(e => e.desbloqueado) ? "🏅 Emblemas Conquistados" : "🔒 Emblemas Bloqueados"}
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 place-items-center">
        {emblemas.map((emblema) => {
          // Debug: mostra os dados do emblema no console
          console.log(`Emblema ${emblema.emblema_id}:`, {
            nome: emblema.emblema_nome,
            status: emblema.status,
            desbloqueado: emblema.desbloqueado,
            pontos: emblema.pontos
          });

          return (
            <div
              key={emblema.emblema_id}
              className={`group relative w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                emblema.desbloqueado
                  ? "cursor-pointer border-yellow-300 hover:border-yellow-400 hover:scale-110"
                  : "border-gray-500 opacity-50 cursor-not-allowed"
              }`}
              onClick={() => emblema.desbloqueado && handleOpenModal(emblema)}
            >
              <Image
                src={emblema.emblema_imagem}
                alt={`Emblema ${emblema.emblema_nome}`}
                className="object-cover w-full h-full"
                width={80}
                height={80}
              />

              {!emblema.desbloqueado || emblema.coletado ? (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">🔒</span>
                </div>
              ) : (
                <>
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-[10px] text-center py-1">
                    {emblema.pontos} pts
                  </div>
                  <div className="absolute inset-0 bg-purple-600 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-white ml-1">Ver Detalhes</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}