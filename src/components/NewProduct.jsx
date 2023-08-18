
import { useForm } from 'react-hook-form'
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getStorage } from 'firebase/storage';

function NewProduct(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = async (data) =>{

        const name = data.name;
        const description = data.description;
        const categories = data.categories;
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
        const productRef = collection(db, 'products');

        try {
            await addDoc(productRef, {
            name,
            description,
            categories,
            price,
            images: imageUrls,
            });
            props.setShowNewProduct(false)
            reset();            
        } catch (error) {
            console.error('Error adding product to Firestore:', error);
        }
}

    return (
 
        <>
           
        <form className="form-new-product" onSubmit={handleSubmit(onSubmit)}> 
            <div className="container-input-new-product">           
                <label htmlFor="name">Nombre</label>   
                <input
                    {...register('name', {
                        required: 'Nombre obligatorio', 
                        maxLength: {
                        value: 50,
                        message: 'Máx 50 caracteres',
                    },                              
                    })}
                    type="text"
                    className="input-new-product"
                    id="name"
                    placeholder="Nombre del producto"
                    />     
                {errors.name && <p className="error-message">{errors.name.message}</p>}                  
            </div>  

            <div className="container-select-new-product">  
                    <label>Categoría</label>          
                    <div className="checkbox">
                        <input
                            {...register('categories')}
                            type="checkbox"
                            value="boxes"
                            id="category-boxes"
                        />
                        <label htmlFor="category-boxes">Cajas sorpresa</label>
                    </div>
                    <div className="checkbox">
                        <input
                            {...register('categories')}
                            type="checkbox"
                            value="breakfast"
                            id="category-breakfast"
                        />
                        <label htmlFor="category-breakfast">Desayunos sorpresa</label>
                    </div>
                    <div className="checkbox">
                        <input
                            {...register('categories')}
                            type="checkbox"
                            value="globes"
                            id="category-globes"
                        />
                        <label htmlFor="category-globes">Globos</label>
                    </div>
                    <div className="checkbox">
                        <input
                            {...register('categories')}
                            type="checkbox"
                            value="aniversary"
                            id="category-aniversary"
                        />
                        <label htmlFor="category-aniversary">Aniversario</label>
                    </div>
                    <div className="checkbox">
                        <input
                            {...register('categories')}
                            type="checkbox"
                            value="birthday"
                            id="category-birthday"
                        />
                        <label htmlFor="category-birthday">Cumpleaños</label>
                    </div>
                    <div className="checkbox">
                        <input
                            {...register('categories')}
                            type="checkbox"
                            value="love"
                            id="category-love"
                        />
                        <label htmlFor="category-love">Amor</label>
                    </div>
                    <div className="checkbox">
                        <input
                            {...register('categories')}
                            type="checkbox"
                            value="family"
                            id="category-family"
                        />
                        <label htmlFor="category-family">Familia</label>
                    </div>
                    <div className="checkbox">
                        <input
                            {...register('categories')}
                            type="checkbox"
                            value="other"
                            id="category-other"
                        />
                        <label htmlFor="category-other">Otra</label>
                    </div>
            </div>  

            <div className="container-textarea-new-product">  
                <label htmlFor="description">Descripción</label>
                <textarea
                    {...register('description')}
                    type="text"
                    className="textarea-new-product"
                    id="description"
                    placeholder="Comienza a escribir"
                    rows="5"
                ></textarea>                      
            </div>    

            <div className="container-input-new-product">  
                <label htmlFor="price">Precio</label>
                <input
                    {...register('price', {
                        required: 'Ingresa el precio', 
                        maxLength: {
                        value: 20,
                        message: 'Máx 20 caracteres',
                    },                              
                    })}
                    type="number"
                    className="input-new-product"
                    id="price"
                    placeholder="20.000"
                />
                {errors.price && <p className="error-message">{errors.price.message}</p>}                        
            </div>     

            <div className="container-img-new-product">
                <label htmlFor="images">Imágenes del producto</label>
                <input
                    {...register('images', {
                    required: 'Adjunta al menos una imagen',
                    })}
                    type="file"
                    className="input-new-product"
                    id="images"
                    multiple
                    accept="image/*"
                />
                {errors.images && <p className="error-message">{errors.images.message}</p>}
            </div>  

            <button type="submit" className="create-btn">Crear</button>
        </form>
             
        </>

    );
}

export default NewProduct