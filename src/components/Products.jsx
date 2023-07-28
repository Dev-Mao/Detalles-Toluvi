import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../lib/firebase';
import { useState, useEffect } from 'react';
function Products(props) {

    const [products, setProducts] = useState([])
    // const db = getFirestore(app);
    // const productsRef = collection(db, 'products');
    // // Obtener los datos existentes una vez
    // getDocs(productsRef)
    // .then((querySnapshot) => {
      
    //   const productsData = [];
    //   querySnapshot.forEach((doc) => {
    //     productsData.push({ id: doc.id, ...doc.data() });
    //   });
    //   setProducts(productsData);
    // })
    // .catch((error) => {
    //   console.error('Error obteniendo los datos:', error);
    // });

    useEffect(() => {
      const db = getFirestore(app);
      const productsRef = collection(db, 'products');
  
      getDocs(productsRef)
        .then((querySnapshot) => {
          const productsData = [];
          querySnapshot.forEach((doc) => {
            productsData.push({ id: doc.id, ...doc.data() });
          });
          setProducts(productsData);
        })
        .catch((error) => {
          console.error('Error obteniendo los datos:', error);
        });
    }, []);
  
    // Aplicar el filtrado y ordenado cuando cambian los estados de filtro y ordenado
    useEffect(() => {
      let filteredProducts = [...products];
  
      // Filtrar productos según el valor seleccionado en el filtro
      if (props.filter) {
        filteredProducts = filteredProducts.filter((product) => product.category === filter);
      }
  
      // Ordenar productos según el valor seleccionado en el ordenado
      if (props.orderby === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (props.orderby === 'des') {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
  
      setProducts(filteredProducts);
    }, [props.filter, props.orderby, products]);

    return (
      <>        
        <div className="container-products">
        {products.map((product) => (
      
            <div className="product-card" key={product.id}>
                <h2 className = "product-name">{product.name}</h2>
                <img className = "product-img" src={product.img}/> 
                <span className = "product-price">{product.price}</span>             
            </div>
        ))}
            
        </div>
   
      </>
    );
  }
  
  export default Products