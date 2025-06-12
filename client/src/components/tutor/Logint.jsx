import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TutorLoginContextObj } from "../contexts/TutorLoginContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const { handleLogin } = useContext(TutorLoginContextObj);
  const navigate = useNavigate();

  function onSubmit(data) {
    handleLogin(data, navigate); 
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="container w-50 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Tutor Name:</label>
          <input type="text" {...register('tutorname')} className="form-control mb-3 mt-2" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" {...register('password')} className="form-control mb-3 mt-2" />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
