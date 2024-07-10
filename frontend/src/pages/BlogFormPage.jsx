import { useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../Http";

const BlogFormPage = () => {
  const { _id } = useParams();
  if (_id) {
    const { isPending, isError, error, data } = useQuery({
      queryFn: fetchBlogs,
      queryKey: ["blogs"],
    });

    if (isPending) {
      return <p className="text-center">Loading...</p>;
    }
    if (isError) {
      return (
        <div className="bg-red-700 p-6 text-white font-bold text-center">
          {error.response.data.message}
        </div>
      );
    }
    const blog = data.data.find((bg) => bg._id === _id);
    return <BlogForm blog={blog} />;
  } else {
    return <BlogForm />;
  }
};

export default BlogFormPage;
