import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog._id}`}>
      <li className="flex shadow mb-12">
        <img src={blog.image.url} alt="blog image" className=" w-1/2" />
        <div className="bg-stone-100 p-8 pt-16 w-1/2">
          <p className="text-sm">{blog.createdAt}</p>
          <h1 className="text-4xl mt-8 my-6">{blog.title}</h1>
          <p>{blog.content.slice(0, 150)}...</p>
        </div>
      </li>
    </Link>
  );
};

export default Blog;
