import { useForm } from "react-hook-form";
import bg from "../../assets/banner1.jpg";
import Container from "../../components/shared/Container";
import Title from "../../components/shared/Title";
import toast from "react-hot-toast";
import useSecureAPI from "../../hooks/useSecureAPI";
import usePublicAPI from "../../hooks/usePublicAPI";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateStorePage = () => {
  const [description, setDescription] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = usePublicAPI();
  const axiosSecure = useSecureAPI();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const shopName = data.shopName;
    const shopLocation = data.shopLocation;

    const toastId = toast.loading("Progress...");

    const res = await axiosPublic.post(
      image_hosting_api,
      { image: data.shopLogo[0] },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      const shopInfo = {
        shopName,
        shopLocation,
        description,
        shopLogo: res?.data?.data?.image?.url,
        email: user?.email,
        name: user?.displayName,
        limit: 3,
      };

      axiosSecure.post("/api/shop/create", shopInfo).then((res) => {
        if (res.data.insertedId) {
          axiosSecure.patch(`/api/user/update/${user?.email}`).then((res) => {
            if (res.data.modifiedCount > 0) {
              reset();
              toast.success(
                "Congratulations! Your shop has been successfully created 🎉",
                { id: toastId, duration: 4000 }
              );
            }
          });
        } else if (res.data.message) {
          toast.error(res.data.message, { id: toastId, duration: 4000 });
        }
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        transformOrigin: "center",
      }}
      className="bg-cover bg-no-repeat bg-center min-h-screen"
    >
      <Container>
        <Title
          subTitle="Transform your passion into a business! Create your own shop by filling out the form below. Make it uniquely yours with a captivating name, an eye-catching logo, and an enticing description. Your shop, your rules!"
          title="Create Your Shop"
          className="pt-24 sm:pt-36 lg:pt-40 pb-20"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sm:w-3/4 sm:mx-auto pb-20 overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <label className="font-bold opacity-80" htmlFor="">
                Shop Name
              </label>
              <input
                {...register("shopName", {
                  required: true,
                  minLength: 4,
                  maxLength: 30,
                })}
                className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 font-semibold opacity-80 rounded-md"
                placeholder="Enter shop name..."
                type="text"
              />
              {errors.shopName?.type === "required" && (
                <span className="text-red-600">*shop name is required.</span>
              )}
              {errors.shopName?.type === "minLength" && (
                <span className="text-red-600">
                  *shop name must be at least 4 characters long.
                </span>
              )}
              {errors.shopName?.type === "maxLength" && (
                <span className="text-red-600">
                  *name cannot exceed 30 characters.
                </span>
              )}
            </div>

            <div className="flex-1">
              <label className="font-bold opacity-80" htmlFor="">
                Shop Location
              </label>
              <input
                {...register("shopLocation", {
                  required: true,
                })}
                className="w-full mt-2 px-4 py-2 border  outline-none focus:border-sky-500 font-semibold opacity-80 rounded-md"
                placeholder="Enter shop location..."
                type="text"
              />
              {errors.shopLocation?.type === "required" && (
                <span className="text-red-600">
                  *shop location is required.
                </span>
              )}
            </div>
          </div>
          <div className="mt-10">
            <label className="font-bold opacity-80 mr-5" htmlFor="textAria">
              Shop Logo
            </label>
            <input
              {...register("shopLogo", {
                required: true,
              })}
              className="px-4 py-2 font-semibold"
              placeholder="Enter shop location..."
              type="file"
            />
          </div>
          {errors.shopLogo?.type === "required" && (
            <span className="text-red-600">*shop logo is required.</span>
          )}
          <div className="flex flex-col w-full mt-10">
            <label className="font-bold opacity-80" htmlFor="textAria">
              Shop Info (description)
            </label>
            <textarea
              onBlur={(e) => setDescription(e.target.value)}
              name=""
              id="textAria"
              cols="30"
              rows="4"
              className="w-full mt-2 px-3 py-2 border  outline-none focus:border-sky-500 font-semibold opacity-80 rounded-md"
              placeholder="Enter your message..."
              required
            ></textarea>
          </div>
          <div className="text-center mt-12">
            <input
              className="btn bg-sky-500 hover:bg-sky-600 text-lg text-white rounded-md border-transparent hover:border-transparent"
              type="submit"
              value="Create Shop"
            />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default CreateStorePage;
