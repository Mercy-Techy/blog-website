import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, uploadProfile, userDetails } from "../Http";
import { useState } from "react";

const About = () => {
  const [defaultImage, setDefaultImage] = useState();
  const { isPending, data, error, isError } = useQuery({
    queryKey: ["user"],
    queryFn: userDetails,
  });

  const {
    mutate,
    isError: mutateIsError,
    error: mutateError,
  } = useMutation({
    mutationFn: uploadProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onMutate: async ({ image }) => {
      const newImageUrl = URL.createObjectURL(image);
      setDefaultImage(newImageUrl);
    },
    onError: async () => setDefaultImage(),
  });

  const handleUpload = (event) => {
    const image = event.target.files[0];
    mutate({ image });
  };

  if (isPending) {
    return <p className="text-center">Loading...</p>;
  }

  if (isError || mutateIsError) {
    const scopeError = error || mutateError;
    return (
      <div className="bg-red-700 p-6 text-white font-bold text-center">
        {scopeError.response?.data?.message || scopeError.message}
      </div>
    );
  }
  const user = data?.data;
  return (
    <>
      <div className="flex justify-center items-center mt-10 ">
        <div className="relative">
          <img
            src={
              defaultImage ||
              user?.avatar?.url ||
              "https://media.istockphoto.com/id/1179997588/photo/you-dont-need-someone-else-to-buy-you-flowers.webp?b=1&s=170667a&w=0&k=20&c=w0zci0D3ewaSCmiU9nU6-8PKBx770Lvzx7I9t_7Lek0="
            }
            className="w-48 h-48 rounded-full object-cover"
          />
          <input
            type="file"
            className="absolute z-20 w-11 opacity-0 h-10 right-0 bottom-0 cursor-pointer"
            accept="image/*"
            onChange={handleUpload}
          />
          <span className="inline-block absolute bottom-0 right-0 bg-black text-white px-3 py-1 rounded-full font-bold text-3xl">
            +
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center mt-2">
        <div className="w-3/6 text-center">
          <h1 className="text-3xl my-2">Hi, i am {user.userName}</h1>
          <p className="text-lg font-thin mt-2">{user.bio}</p>
        </div>
      </div>
    </>
  );
};

export default About;
