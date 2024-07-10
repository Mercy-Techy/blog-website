import { useMutation } from "@tanstack/react-query";
import { addBlog, editBlog, queryClient } from "../Http";
import { useNavigate } from "react-router-dom";

const BlogForm = ({ blog }) => {
  const text = blog ? "Edit" : "Add";

  const navigate = useNavigate();

  const mutateFunction = blog ? editBlog : addBlog;

  const { isPending, error, isError, mutate } = useMutation({
    mutationFn: mutateFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      return navigate("/blogs");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const blogData = Object.fromEntries(formData);
    if (blog) {
      blogData.blogId = blog._id;
    }
    mutate(blogData);
  };

  return (
    <>
      {isError && (
        <div className="bg-red-700 p-6 text-white font-bold text-center">
          {error.response.data.message}
        </div>
      )}
      <div className="flex flex-col items-center justify-center mt-6">
        <h1 className="text-4xl font-bold mb-4">
          {blog ? "Edit" : "New"} Blog
        </h1>
        <form
          className="bg-white p-8 shadow rounded w-2/5 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={blog?.title}
              className="w-full p-2 border rounded outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Content</label>
            <textarea
              type="text"
              name="content"
              defaultValue={blog?.content}
              className="w-full p-2 border rounded outline-none h-20"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Banner</label>
            <input
              type="file"
              name="image"
              className="w-full p-2 border rounded outline-none"
              required={!blog}
            />
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-black mt-4 text-white p-2 rounded"
          >
            {isPending ? "Submitting..." : text}
          </button>
        </form>
      </div>
    </>
  );
};

export default BlogForm;
