import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../Http";

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: signup,
    onSuccess: () => navigate("/login"),
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Sign Up</h1>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bio</label>
            <textarea
              type="text"
              name="bio"
              className="w-full p-2 border rounded outline-none h-20"
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
            {isPending ? "Submitting..." : "Sign Up"}
          </button>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
