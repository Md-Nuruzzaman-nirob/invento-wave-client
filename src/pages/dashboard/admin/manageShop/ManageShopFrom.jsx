import emailjs from "@emailjs/browser";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../../components/shared/Button";
import { BiSolidMessageRounded } from "react-icons/bi";
import PropTypes from "prop-types";
import bg from "../../../../assets/rm141-nunny-02b.jpg";

const serviceId = import.meta.env.VITE_SERVICE_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID_FOR_USERS;
const publishKey = import.meta.env.VITE_PUBLISH_KEY;
const ManageShopFrom = ({ data, index }) => {
  const [dynamicModalID, setDynamicModalID] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Progress...");

    const params = {
      to_email: data?.email,
      name: data?.name,
      message: e.target.message.value,
    };

    emailjs
      .send(serviceId, templateId, params, publishKey)
      .then((res) => {
        if (res.text === "OK") {
          toast.success("Message sent successfully !", {
            id: toastId,
          });
          e.target.reset();

          // Close the modal
          const modal = document.getElementById(dynamicModalID);
          if (modal) {
            modal.close();
          }
        } else {
          toast.error("Failed to send message", { id: toastId });
        }
      })
      .catch((error) => {
        toast.error(error, { id: toastId });
      });
  };
  return (
    <>
      <tr key={data._id} className="hover">
        <th>{index + 1}</th>
        <td className="flex items-center justify-center">
          <img className="w-32 h-32 rounded-md" src={data?.shopLogo} alt="" />
        </td>
        <td>{data?.shopName}</td>
        <td>{data?.shopLocation}</td>
        <td>{data?.limit}</td>
        <td>
          <div>
            <Button
              onClick={() => {
                document.getElementById(index).showModal();
                setDynamicModalID(index);
              }}
            >
              <span className="flex items-center justify-center gap-2">
                {" "}
                <BiSolidMessageRounded /> Send Notice
              </span>
            </Button>
            <dialog
              style={{
                backgroundImage: `url(${bg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              id={index}
              className="modal -z-10"
            >
              <div
                className="modal-box"
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>

                <span>Your notice message to</span>
                <h3 className="font-medium my-5 text-xl">{data?.name}</h3>
                <h3 className="font-medium">
                  {data?.shopName} <span className="font-normal">owner</span>
                </h3>
                <h3 className="">email : {data?.email}</h3>
                <form onSubmit={sendEmail}>
                  <div className="flex flex-col w-full mt-10">
                    <label className="opacity-80" htmlFor="textAria">
                      Your Notice
                    </label>
                    <textarea
                      name="message"
                      id="textAria"
                      cols="30"
                      rows="6"
                      className="w-full mt-2 px-3 py-2 border border-gray-800/30 outline-none focus:border-pink-600 opacity-80 rounded-md"
                      placeholder="Enter your message..."
                      required
                    ></textarea>
                  </div>
                  <div
                    className="text-center mt-8"
                    data-aos="flip-up"
                    data-aos-duration="500"
                  >
                    <input
                      className="btn btn-sm px-10 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-semibold"
                      type="submit"
                      value="Sent"
                    />
                  </div>
                </form>
              </div>
            </dialog>
          </div>
        </td>
      </tr>
    </>
  );
};
ManageShopFrom.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number.isRequired,
};

export default ManageShopFrom;
