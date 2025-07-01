// utils/niveis.ts
export const getTituloNivel = (nivel: number): string => {
  const titulos: Record<number, string> = {
    1: "Iniciante",
    2: "Explorador",
    3: "Aprendiz",
    4: "Intermediário",
    5: "Avançado",
    6: "Expert",
    7: "Mestre",
    8: "Lenda",
    9: "Ídolo",
    10: "Lendário"
  };

  return titulos[nivel] || `Nível ${nivel}`;
};

export const getCorNivel = (nivel: number): string => {
  const cores: Record<number, string> = {
    1: "from-blue-400 to-blue-600",
    2: "from-green-400 to-green-600",
    3: "from-purple-400 to-purple-600",
    4: "from-yellow-400 to-yellow-600",
    5: "from-orange-400 to-orange-600",
    6: "from-red-400 to-red-600",
    7: "from-pink-400 to-pink-600",
    8: "from-indigo-400 to-indigo-600",
    9: "from-teal-400 to-teal-600",
    10: "from-amber-400 to-amber-600"
  };

  return cores[nivel] || "from-gray-400 to-gray-600";
};