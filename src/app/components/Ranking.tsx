
import Image from "next/image";

export default function Ranking(){

  return(
    <>
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
    </>

  );


}