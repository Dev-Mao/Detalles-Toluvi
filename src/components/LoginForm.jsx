import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import Logo from '../assets/logoPNG.png'

const auth = getAuth(app);
const LoginForm = () => {
  const navigate = useNavigate();
  // Llamado a funciones para formularios
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  // Manejar el envío del formulario y hacer la solicitud de la api para crear usuario
  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        localStorage.setItem("admin", true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError("password", {
          type: "invalid",
          message: "Credenciales incorrectas",
        });
      });
  };

  return (
    <div className={styles.containerFormLogin}>
      <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
        <img className={styles.logo} src={Logo} alt="" />
        <div className={styles.containerInputLogin}>
          <label htmlFor="email">Correo de administrador</label>
          <input
            {...register("email", {
              required: "Correo obligatorio",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Correo no válido",
              },
            })}
            type="text"
            className={styles.inputLogin}
            id="email"
            placeholder="correo@ejemplo.com"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className={styles.containerInputLogin}>
          <label htmlFor="password">Contraseña:</label>
          <input
            {...register("password", {
              required: "Ingresa la contraseña",
              minLength: {
                value: 4,
                message: "Constraseña muy corta",
              },
            })}
            type="password"
            className={styles.inputLogin}
            id="password"
            placeholder="•••••••"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
