import LogoPng from "../assets/LogoPng.png"

function Header(props) {
  

  
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
              <option value="boxes">Cajas sorpresa</option>
              <option value="breakfast">Desayunos sorpresa</option>  
              <option value="globes">Globos</option>
              <option value="aniversary">Aniversario</option>
              <option value="birthday">Cumpleaños</option>
              <option value="amor">Amor</option>       
              <option value="family">Familia</option>    
              <option value="other">Otro</option>  
            </select>
          </div>
          <div className="filter-sort-container">
            <select className="filter-sort-select" defaultValue={''} id="price" name="price" onChange={handleOrderbyChange}>
                <option disabled value="">Ordenar</option>
                <option value="asc">Precio Ascendente</option>
                <option value="des">Precio Descendente</option>
            </select>
        </div>
    </header>
    </>
  );
}

export default Header