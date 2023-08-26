import { useState } from "react";
import { useForm } from "react-hook-form";
import { getFirestore, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getStorage } from "firebase/storage";
import PropTypes from "prop-types";
import styles from "./Products.module.css";
import { BsWhatsapp, BsChevronRight, BsChevronLeft } from "react-icons/bs";

function ProductCard(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWhatsAppClick = (productName) => {
    // Reemplaza el número de teléfono y el mensaje con los valores deseados
    const phoneNumber = '+57 3044176222';
    const message = `Hola, estoy interesado/a en el producto: ${productName}. ¿Podrías darme más información?`;

    // Crea la URL de redirección a WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Redirige a WhatsApp
    window.location.href = whatsappUrl;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      Math.min(prevIndex + 1, props.product.images.length - 1)
    );
  };

  const handleEdit = () => {
    props.setIsEditing(true);
  };

  const onEdit = async (data) => {
    // Upload images to Firebase Storage
    const storage = getStorage(); // Initialize Firebase Storage
    let imageUrls = props.product.images;

    if (data.images.length > 0) {
      imageUrls = [];
      const images = data.images;
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageRef = ref(storage, `product-images/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }
    }

    const newData = {
      name: data.name,
      description: data.description,
      categories: data.categories,
      price: data.price,
      images: imageUrls,
    };

    updateDoc(doc(getFirestore(), "products", props.product.id), newData).then(
      () => {
        props.setIsEditing(false);
      }
    );
  };

  const handleCancel = () => {
    props.setIsDeleting(false);
  };

  const onDelete = () => {
    deleteDoc(doc(getFirestore(), "products", props.product.id));
    handleCancel();
  };

  const handleDelete = () => {
    props.setIsDeleting(true);
  };

  return (
    <div className={styles.productCard}>
      {props.isEditing ? (
        // Vista editable
        <>
          <form>
            <div className="container-textarea-new-product">
              <label htmlFor="name">Nombre</label>
              <input
                {...register("name")}
                type="text"
                className="input-new-product"
                id="name"
                placeholder="Nombre del producto"
                defaultValue={props.product.name}
              ></input>
            </div>
            <input
              {...register("images")}
              type="file"
              className="input-new-product"
              id="images"
              multiple
              accept="image/*"
            />
            {props.product.images.map((image, index) => (
              <img
                className="product-img"
                src={image}
                key={index}
                alt={`Product ${index + 1}`}
                style={{
                  display: index === currentImageIndex ? "block" : "none",
                }}
              />
            ))}

            <div className="container-input-new-product">
              <label htmlFor="price">Precio</label>
              <input
                {...register("price", {
                  required: "Ingresa el precio",
                  maxLength: {
                    value: 20,
                    message: "Máx 20 caracteres",
                  },
                })}
                type="number"
                className="input-new-product"
                id="price"
                placeholder="20.000"
                defaultValue={props.product.price}
              />
              {errors.price && (
                <p className="error-message">{errors.price.message}</p>
              )}
            </div>
            <div className="container-select-new-product">
              <label>Categoría</label>
              <div className="checkbox">
                <input
                  {...register("categories")}
                  type="checkbox"
                  value="boxes"
                  id="category-boxes"
                  defaultChecked={props.product.categories.includes("boxes")}
                />
                <label htmlFor="category-boxes">Cajas sorpresa</label>
              </div>
              <div className="checkbox">
                <input
                  {...register("categories")}
                  type="checkbox"
                  value="breakfast"
                  id="category-breakfast"
                  defaultChecked={props.product.categories.includes(
                    "breakfast"
                  )}
                />
                <label htmlFor="category-breakfast">Desayunos sorpresa</label>
              </div>
              <div className="checkbox">
                <input
                  {...register("categories")}
                  type="checkbox"
                  value="globes"
                  id="category-globes"
                  defaultChecked={props.product.categories.includes("globes")}
                />
                <label htmlFor="category-globes">Globos</label>
              </div>
              <div className="checkbox">
                <input
                  {...register("categories")}
                  type="checkbox"
                  value="aniversary"
                  id="category-aniversary"
                  defaultChecked={props.product.categories.includes(
                    "aniversary"
                  )}
                />
                <label htmlFor="category-aniversary">Aniversario</label>
              </div>
              <div className="checkbox">
                <input
                  {...register("categories")}
                  type="checkbox"
                  value="birthday"
                  id="category-birthday"
                  defaultChecked={props.product.categories.includes("birthday")}
                />
                <label htmlFor="category-birthday">Cumpleaños</label>
              </div>
              <div className="checkbox">
                <input
                  {...register("categories")}
                  type="checkbox"
                  value="love"
                  id="category-love"
                  defaultChecked={props.product.categories.includes("love")}
                />
                <label htmlFor="category-love">Amor</label>
              </div>
              <div className="checkbox">
                <input
                  {...register("categories")}
                  type="checkbox"
                  value="family"
                  id="category-family"
                  defaultChecked={props.product.categories.includes("family")}
                />
                <label htmlFor="category-family">Familia</label>
              </div>
              <div className="checkbox">
                <input
                  {...register("categories")}
                  type="checkbox"
                  value="other"
                  id="category-other"
                  defaultChecked={props.product.categories.includes("other")}
                />
                <label htmlFor="category-other">Otra</label>
              </div>
            </div>
          </form>
        </>
      ) : (
        // Vista de solo lectura
        <>
          <h2 className={styles.productName}>{props.product.name}</h2>

          <div className={styles.containerImg}>
            <BsChevronLeft
              className={styles.arrow}
              onClick={showPreviousImage}
              disabled={currentImageIndex === 0}
            >
              Anterior
            </BsChevronLeft>

            {props.product.images.map((image, index) => (
              <img
                className="product-img"
                src={image}
                key={index}
                alt={`Product ${index + 1}`}
                style={{
                  display: index === currentImageIndex ? "block" : "none",
                }}
              />
            ))}

            <BsChevronRight
              className={styles.arrow}
              onClick={showNextImage}
              disabled={currentImageIndex === props.product.images.length - 1}
            >
              Siguiente
            </BsChevronRight>
          </div>
          <span className={styles.price}>${props.product.price}</span>

          <button className={styles.goToWpp} onClick={() => handleWhatsAppClick(props.product.name)} >
            <BsWhatsapp className={styles.logoWhatsapp}/>
            Me interesa
          </button>
        </>
      )}

      {props.admin && (
        <div className={styles.containerBtnEdit}>
          {props.isEditing ? (
            <button onClick={handleSubmit(onEdit)}>Guardar</button>
          ) : props.isDeleting ? (
            <div>
              <p>
                ¿Estás seguro que quieres eliminar el producto{" "}
                <strong>{props.product.name}</strong>?
              </p>
              <button onClick={onDelete}>Sí</button>
              <button onClick={handleCancel}>No</button>
            </div>
          ) : (
            <div>
              <button onClick={handleEdit}>Editar</button>
              <button onClick={handleDelete}>Eliminar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.object,
  admin: PropTypes.string,
  isEditing: PropTypes.bool,
  isDeleting: PropTypes.bool,
  setIsDeleting: PropTypes.func,
  setIsEditing: PropTypes.func,
};
