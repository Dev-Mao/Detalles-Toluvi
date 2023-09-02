import { useForm } from "react-hook-form";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getStorage } from "firebase/storage";
import PropTypes from "prop-types";
import styles from "./NewProduct.module.css";

function NewProduct(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const name = data.name;
    const categories = data.categories;
    const description = data.description;
    const price = data.price;
    const images = data.images;
    // Upload images to Firebase Storage
    const storage = getStorage(); // Initialize Firebase Storage
    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageRef = ref(storage, `product-images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      imageUrls.push(imageUrl);
    }

    // Save the information to Firebase Firestore
    const db = getFirestore(); // Initialize Firebase Firestore
    const productRef = collection(db, "products");

    try {
      await addDoc(productRef, {
        name,
        categories,
        description,
        price,
        images: imageUrls,
      });
      props.setShowNewProduct(false);
      reset();
    } catch (error) {
      console.error("Error adding product to Firestore:", error);
    }
  };

  return (
    <div className={styles.containerFormNewProduct}>
      <form className={styles.formNewProduct} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.containerInputNewProduct}>
          <label htmlFor="name">Nombre</label>
          <input
            {...register("name", {
              required: "Nombre obligatorio",
            })}
            type="text"
            className={styles.inputNewProduct}
            id="name"
            placeholder="Comienza a escribir"
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label>Categoría(s):</label>
          <div className="checkbox">
            <input
              {...register("categories")}
              type="checkbox"
              value="boxes"
              id="category-boxes"
            />
            <label htmlFor="category-boxes">Cajas sorpresa</label>
          </div>
          <div className="checkbox">
            <input
              {...register("categories")}
              type="checkbox"
              value="breakfast"
              id="category-breakfast"
            />
            <label htmlFor="category-breakfast">Desayunos sorpresa</label>
          </div>
          <div className="checkbox">
            <input
              {...register("categories")}
              type="checkbox"
              value="globes"
              id="category-globes"
            />
            <label htmlFor="category-globes">Globos</label>
          </div>
          <div className="checkbox">
            <input
              {...register("categories")}
              type="checkbox"
              value="aniversary"
              id="category-aniversary"
            />
            <label htmlFor="category-aniversary">Aniversario</label>
          </div>
          <div className="checkbox">
            <input
              {...register("categories")}
              type="checkbox"
              value="birthday"
              id="category-birthday"
            />
            <label htmlFor="category-birthday">Cumpleaños</label>
          </div>
          <div className="checkbox">
            <input
              {...register("categories")}
              type="checkbox"
              value="love"
              id="category-love"
            />
            <label htmlFor="category-love">Amor</label>
          </div>
          <div className="checkbox">
            <input
              {...register("categories")}
              type="checkbox"
              value="family"
              id="category-family"
            />
            <label htmlFor="category-family">Familia</label>
          </div>
          <div className="checkbox">
            <input
              {...register("categories")}
              type="checkbox"
              value="ancheta"
              id="category-ancheta"
            />
            <label htmlFor="category-ancheta">Anchetas</label>
          </div>
          <div className="checkbox">
            <input
              {...register("categories")}
              type="checkbox"
              value="other"
              id="category-other"
            />
            <label htmlFor="category-other">Otra</label>
          </div>
        </div>
        <div className={styles.containerInputNewProduct}>
          <label htmlFor="description">Descripción: </label>
          <textarea
            type="text"
            className={styles.inputNewProduct}
            id="description"
            rows={5}
            placeholder="Comienza a escribir"
          />
        </div>
        <div className={styles.containerInputNewProduct}>
          <label htmlFor="price">Precio:</label>
          <input
            {...register("price", {
              required: "Ingresa el precio",
              maxLength: {
                value: 20,
                message: "Máx 20 caracteres",
              },
            })}
            type="number"
            className={styles.inputNewProduct}
            id="price"
            placeholder="$"
          />
          {errors.price && (
            <p className="error-message">{errors.price.message}</p>
          )}
        </div>

        <div className={styles.containerInputNewProduct}>
          <label htmlFor="images">Imágenes del producto</label>
          <input
            {...register("images", {
              required: "Adjunta al menos una imagen",
            })}
            type="file"
            className={styles.inputNewProduct}
            id="images"
            multiple
            accept="image/*"
          />
          {errors.images && (
            <p className="error-message">{errors.images.message}</p>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Crear
        </button>
      </form>
    </div>
  );
}

export default NewProduct;

NewProduct.propTypes = {
  setShowNewProduct: PropTypes.func,
};
