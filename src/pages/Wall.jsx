import Header from "../components/Header";
import Products from "../components/Products";
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../lib/firebase";
import NewProduct from "../components/NewProduct";

function Wall() {
  const auth = getAuth(app);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [orderby, setOrderby] = useState("");
  const [admin, setAdmin] = useState(null);
  const [showNewProduct, setShowNewProduct] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAdmin(user);
    });
  }),
    [];

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
          <button onClick={handleshowForm}>Crear producto</button>
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
    </>
  );
}

export default Wall;
