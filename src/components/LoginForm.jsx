import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

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
    <>
      <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
        <div className="container-input-login">
          <label htmlFor="email">Tu correo</label>
          <input
            {...register("email", {
              required: "Correo obligatorio",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Correo no válido",
              },
            })}
            type="text"
            className="input-login"
            id="email"
            placeholder="correo@ejemplo.com"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="container-input-login">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Ingresa la contraseña",
              minLength: {
                value: 4,
                message: "Constraseña muy corta",
              },
            })}
            type="password"
            className="input-login"
            id="password"
            placeholder="•••••••"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
