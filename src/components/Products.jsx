 import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { app } from '../lib/firebase';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import PropTypes from "prop-types";
import styles from "./Products.module.css";
function Products(props) {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 
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
          let productsData = [];
          querySnapshot.forEach((doc) => {
            productsData.push({ id: doc.id, ...doc.data() });
          });
          // Filtrar los productos por el término de búsqueda
        if (props.searchTerm) {
          productsData = productsData.filter(product => product.name.toLowerCase().includes(props.searchTerm.toLowerCase()));
        }
          setProducts(productsData);
        })
        .catch((error) => {
          console.error('Error obteniendo los datos:', error);
        });
    }, [props.filter, props.orderby, props.showNewProduct, isEditing, isDeleting, props.searchTerm, productsRef]);

  return (
    <>
      <div className={styles.containerProducts}>
        {products.map((product) => (
          <ProductCard isDeleting ={isDeleting} setIsDeleting = {setIsDeleting} isEditing = {isEditing} setIsEditing = {setIsEditing} admin = {props.admin} key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}


export default Products;

Products.propTypes = {
  filter: PropTypes.string,
  orderby: PropTypes.string,
  showNewProduct: PropTypes.bool,
  searchTerm: PropTypes.string,
  admin: PropTypes.string,
};