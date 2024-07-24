import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.container}>
      <div className={style.logo}>
        <img src="logo/calendar.png" alt="calendar" />
        <h2 className={style.title}>Calendario</h2>
      </div>
      <div className={style.items}>
        <div className={style.item}>
          <button>Hoy</button>
        </div>
        <div className={style.item}>
          <button>-</button>
          <button>+</button>
        </div>
        <div className={style.item}>
          <p>fehca</p>
        </div>
      </div>
      <div className={style.settings}>
        <img src="logo/settings.png" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
