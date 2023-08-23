import LogoPng from "../assets/LogoPng.png";
import { AiFillSetting } from "react-icons/ai";
import { MdExitToApp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { app } from "../lib/firebase";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
function Header(props) {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        props.setAdmin(null);
        navigate("/");
      })
      .catch(() => {});
  };

  const handleCategoryChange = (event) => {
    props.setFilter(event.target.value);
  };

  const handleOrderbyChange = (event) => {
    props.setOrderby(event.target.value);
  };

  return (
    <>
      <header>
        <img src={LogoPng} className={styles.logo} alt="Logo Toluvi en PNG" />
        <nav>
            <input
              type="search"
              className={styles.searchInput}
              name="search"
              placeholder="Buscar productos..."
              value={props.searchTerm}
              onChange={(e) => props.setSearchTerm(e.target.value)}
            />

          <div className={styles.filterSortContainer}>
            <select
              className={styles.filterSortSelect}
              defaultValue={""}
              id="category"
              name="category"
              onChange={handleCategoryChange}
            >
              <option disabled value="">
                Categoría
              </option>
              <option value="all">Todas</option>
              <option value="boxes">Cajas sorpresa</option>
              <option value="breakfast">Desayunos sorpresa</option>
              <option value="globes">Globos</option>
              <option value="aniversary">Aniversario</option>
              <option value="birthday">Cumpleaños</option>
              <option value="amor">Amor</option>
              <option value="family">Familia</option>
              <option value="other">Otra</option>
            </select>
        
            <select
              className={styles.filterSortSelect}
              defaultValue={""}
              id="price"
              name="price"
              onChange={handleOrderbyChange}
            >
              <option disabled value="">
                Ordenar
              </option>
              <option value="asc">Precio Ascendente</option>
              <option value="des">Precio Descendente</option>
            </select>
          </div>
        </nav>
          {props.admin ? (
            <MdExitToApp className={styles.icon} onClick={handleLogout} />
          ) : (
            <AiFillSetting className={styles.icon} onClick={handleGoToLogin} />
          )}
      </header>
    </>
  );
}

export default Header;

Header.propTypes = {
  admin: PropTypes.string,
  setSearchTerm: PropTypes.func,
  searchTerm: PropTypes.string,
  setAdmin: PropTypes.func,
  setFilter: PropTypes.func,
  setOrderby: PropTypes.func,
};
