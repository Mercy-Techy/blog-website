import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteBlog, fetchBlogs, queryClient } from "../Http";
import Button from "../components/Button";

const BlogDetails = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { isPending, isError, error, data } = useQuery({
    queryFn: fetchBlogs,
    queryKey: ["blogs"],
  });
  const {
    mutate,
    isPending: delPending,
    isError: isDelError,
    error: delError,
  } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] }),
        navigate("/blogs");
    },
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
  const handleDelete = () => {
    mutate(blog._id);
  };

  if (isDelError) {
    return (
      <div className="bg-red-700 p-6 text-white font-bold text-center">
        {delError.response.data.message}
      </div>
    );
  }

  return (
    <div className="shadow mb-12 bg-stone-100 w-2/4 container mx-auto">
      <img
        src={blog.image.url}
        alt="blog image"
        className="object-cover w-full"
      />
      <div className="p-8 pt-16">
        <p className="text-sm">{blog.createdAt}</p>
        <h1 className="text-4xl mt-8 my-6">{blog.title}</h1>
        <p>{blog.content}</p>
        <div className="mt-8 flex justify-end gap-2">
          <Link to={`/blogs/${blog._id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Button onClickFunction={handleDelete}>
            {delPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
