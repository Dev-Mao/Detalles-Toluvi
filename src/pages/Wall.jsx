import Header from "../components/Header";
import Products from "../components/Products";
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../lib/firebase";
import NewProduct from "../components/NewProduct";
import styles from "./Wall.module.css";
import {BsPlusCircle, BsWhatsapp} from "react-icons/bs"

function Wall() {
  const auth = getAuth(app);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [orderby, setOrderby] = useState("");
  const [admin, setAdmin] = useState(null);
  const [showNewProduct, setShowNewProduct] = useState(false);

  const handleWhatsAppClick = () => {
    // Reemplaza el número de teléfono y el mensaje con los valores deseados
    const phoneNumber = '+57 3044176222';
    const message = 'Hola, estoy interesado/a en unos de tus productos, vengo desde la página.';

    // Crea la URL de redirección a WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Redirige a WhatsApp
    window.location.href = whatsappUrl;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAdmin(user);
    });
  }, [auth]);

  const handleshowForm = () => {
    showNewProduct ? setShowNewProduct(false) : setShowNewProduct(true);
  };

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        admin={admin}
        setAdmin={setAdmin}
        filter={filter}
        setFilter={setFilter}
        orderby={orderby}
        setOrderby={setOrderby}
      />
      {admin && (
        <>
        <div className={styles.iconNewProductContainer} onClick={handleshowForm}>
          <BsPlusCircle className={styles.iconNewProduct}/>
        <span>Nuevo</span>
        </div>
          {showNewProduct && (
            <NewProduct setShowNewProduct={setShowNewProduct} />
          )}
        </>
      )}

      <Products
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showNewProduct={showNewProduct}
        filter={filter}
        setFilter={setFilter}
        orderby={orderby}
        admin={admin}
        setOrderby={setOrderby}
      />
      <button className={styles.logoWhatsappContainer}  onClick={handleWhatsAppClick}>
          <BsWhatsapp className={styles.logoWhatsapp}/>
        </button>
    </>

  );
}

export default Wall;
