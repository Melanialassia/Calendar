const Navbar = ({ openCreateModal }) => {
  
  return (
    <nav className="bg-white">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/"
          className="flex items-center space-x-3 text-zinc-700 rtl:space-x-reverse"
        >
          <img src="/logo/calendar.png" className="h-8" alt="Calendar logo" />
          <span className="self-center text-2xl font-semibold text-zinc-600">
            Calendario
          </span>
        </a>
        <div className="flex md:order-2">
          <button
            onClick={openCreateModal}
            className="p-2.5 transition-all duration-300 rounded-lg hover:bg-gray-100"
          >
            <img
              src="/logo/add.png"
              alt="add logo"
              className="w-7 transition-transform duration-300 hover:animate-rotate-scale"
            />
          </button>
        </div>
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
