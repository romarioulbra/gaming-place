// Componente para os itens de benefício
export default function BenefitItem({ color, title, description, icon }: { color: string; title: string; description: string; icon: string }) {
  const colors = {
    green: 'text-green-600 border-green-500 bg-green-50',
    blue: 'text-blue-600 border-blue-500 bg-blue-50',
    purple: 'text-purple-600 border-purple-500 bg-purple-50',
    yellow: 'text-yellow-600 border-yellow-500 bg-yellow-50'
  };

  return (
    <li className={`flex items-start p-3 rounded-lg border-l-4 ${colors[color]} hover:shadow-md transition-shadow duration-200`}>
      <div className={`bg-${color}-100 p-2 rounded-full mr-3`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-${color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </li>
  );
}