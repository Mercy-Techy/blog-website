import { useQuery } from "@tanstack/react-query";
import Blog from "../components/Blog";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../Http";
import Button from "../components/Button";

const Blogs = () => {
  const { isPending, isError, error, data } = useQuery({
    queryFn: fetchBlogs,
    queryKey: ["blogs"],
  });

  if (isPending) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      {isError && (
        <div className="bg-red-700 p-6 text-white font-bold text-center">
          {error.response.data.message}
        </div>
      )}
      <div className="container mx-auto px-16">
        <div className="flex justify-end">
          <Link to="add">
            <Button>Add Blog</Button>
          </Link>
        </div>
        <ul className="mt-8">
          {data.data.map((blog) => (
            <Blog key={blog._id} blog={blog} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Blogs;
