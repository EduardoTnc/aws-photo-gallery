const Header = () => {
    return (
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Galería de Imágenes AWS</h1>
              <p className="opacity-90">SPA + API en ECS, S3 y RDS</p>
            </div>
          </div>
        </div>
      </header>
    );
  };
  export default Header;