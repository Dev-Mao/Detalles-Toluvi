 import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { app } from '../lib/firebase';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function Products(props) {
  const [products, setProducts] = useState([]);
  const db = getFirestore(app);
  const productsRef = collection(db, 'products');

  useEffect(() => {
      // Crear una consulta base que siempre traiga todos los productos
      let filteredQuery = query(productsRef);

      // Aplicar filtro si se selecciona alguna categoría
      if (props.filter !== 'all') {
        filteredQuery = query(productsRef, where('categories', 'array-contains', props.filter));
      }
  
      // Apply sorting if orderby is selected
      if (props.orderby === 'asc') {
        filteredQuery = query(filteredQuery, orderBy('price', 'asc'));
      } else if (props.orderby === 'des') {
        filteredQuery = query(filteredQuery, orderBy('price', 'desc'));
      }
  
      // Obtener los productos según la consulta filtrada
      getDocs(filteredQuery)
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
    }, [props.filter, props.orderby, props.showNewProduct]);

  return (
    <>
      <div className="container-products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}


export default Products;
