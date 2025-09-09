const Header = () => {
    return (
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Galería de Imágenes AWS</h1>
          <p className="text-gray-600">Desplegada con ECS, S3 y RDS</p>
        </div>
      </header>
    );
  };
  export default Header;