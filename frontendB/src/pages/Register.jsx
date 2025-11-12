export default function Register() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Registrarse</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre"
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />
        <button className="bg-green-600 hover:bg-green-500 text-white py-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
}
