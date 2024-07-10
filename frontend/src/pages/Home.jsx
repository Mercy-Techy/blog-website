import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  return (
    <main
      className="bg-cover bg-no-repeat h-screen text-center bg-center flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: `url(
          "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=600"
        )`,
      }}
    >
      <h1 className="text-5xl font-bold">Welcome to Daily Reflections</h1>
      <p className="my-6 text-xl">
        Join us and share your thoughts with the world. Create an account to
        start your blogging journey.
      </p>
      <div className="mt-5">
        <Link to="/signup">
          <Button>Get Started</Button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
