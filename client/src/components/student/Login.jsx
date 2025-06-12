import { useForm } from "react-hook-form";
import { useContext } from "react";
import { StudentLoginContextObj } from "../contexts/StudentLoginContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const { handleLogin } = useContext(StudentLoginContextObj);
  const navigate = useNavigate();

  function onSubmit(data) {
    handleLogin(data, navigate); // pass navigate to the context
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="container w-50 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Student Name:</label>
          <input type="text" {...register('studentname')} className="form-control mb-3 mt-2" />
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
