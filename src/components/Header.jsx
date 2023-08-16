import LogoPng from "../assets/LogoPng.png"
import {AiFillSetting} from "react-icons/ai"
import {MdExitToApp} from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from 'firebase/auth';
import { app } from "../lib/firebase";

function Header(props) {
  const isAdmin = localStorage.getItem('admin');

  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleGoToLogin  = () =>{
    navigate('/login')
  } 

  const handleLogout  = () =>{    
    signOut(auth)
        .then(() => {
          props.setAdmin(null)
          navigate('/')
        })
        .catch(() => {
        });
  } 
  
  const handleCategoryChange = (event) => {
    props.setFilter(event.target.value);
  };

  const handleOrderbyChange = (event) => {
    props.setOrderby(event.target.value);
  };

  return (
    <>
      <header>
        <img src={LogoPng} className = "logo-png" alt="Logo Toluvi en PNG" />
        <div className="search-bar">
            <input type="search" className="search-bar-input" name="search" placeholder="Buscar productos..."/>
            <button type="button">Buscar</button>
        </div>

        <div className="filter-sort-container">
            <select className="filter-sort-select" defaultValue={''} id="category" name="category" onChange={handleCategoryChange} >
              <option disabled value=''>Categoría</option>
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
          </div>
          <div className="filter-sort-container">
            <select className="filter-sort-select" defaultValue={''} id="price" name="price" onChange={handleOrderbyChange}>
                <option disabled value="">Ordenar</option>
                <option value="asc">Precio Ascendente</option>
                <option value="des">Precio Descendente</option>
            </select>
        </div>
        {props.admin? (
                    <MdExitToApp onClick={handleLogout}/>
                ) : (
                    <AiFillSetting onClick={handleGoToLogin}/>
                ) }
        
    </header>

    </>
  );
}

export default Header