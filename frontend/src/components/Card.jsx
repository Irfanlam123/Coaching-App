export default function Card({ title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:scale-105 transition">
      <h3 className="text-xl font-bold text-blue-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
