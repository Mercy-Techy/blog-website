import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Http";
import { saveToken } from "../util/auth";
import { useAuth } from "../store/AuthContext";

const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      saveToken(data.data.token);
      logIn();
      return navigate("/about");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);
    mutate(userData);
  };
  return (
    <>
      {isError && (
        <div className="bg-red-700 p-6 text-white font-bold text-center">
          {error?.response?.data?.message || error.message}
        </div>
      )}
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <form
          className="bg-white p-8 shadow rounded w-11/12 md:w-2/5"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="userName"
              className="w-full p-2 border rounded outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded outline-none"
              required
            />
          </div>
          <button
            disabled={isPending}
            type="submit"
            className={`w-full ${
              isPending ? "bg-stone-500" : "bg-black"
            } mt-4 text-white p-2 rounded hover:bg-dark`}
          >
            {isPending ? "Submitting..." : "Log In"}
          </button>
          <p className="text-center mt-4">
            Don't have an account?
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
