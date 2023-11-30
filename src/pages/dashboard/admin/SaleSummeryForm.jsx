/* eslint-disable react/prop-types */

import emailjs from "@emailjs/browser";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/shared/Button";
import { BiSolidMessageRounded } from "react-icons/bi";

const serviceId = import.meta.env.VITE_SERVICE_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID_FOR_USERS;
const publishKey = import.meta.env.VITE_PUBLISH_KEY;

const SaleSummeryForm = ({ data, index }) => {
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
        <td>{data?.name}</td>
        <td>{data?.email}</td>
        <td>{data?.shopName}</td>
        <td>{data?.role}</td>
        <td>
          <div>
            {data?.role === "System-Admin" ? (
              <Button disabled={true}>
                {" "}
                <span className="flex items-center justify-center gap-2">
                  {" "}
                  <BiSolidMessageRounded /> Send Email
                </span>
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setDynamicModalID(index);
                    document.getElementById(index).showModal();
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {" "}
                    <BiSolidMessageRounded /> Send Email
                  </span>
                </Button>
              </>
            )}
            <dialog id={index} className="modal -z-10">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3>
                  To : <span className="font-semibold">{data?.email}</span>
                </h3>
                <p className="mt-1">
                  <span className="font-semibold">{data?.role}</span>
                </p>
                <form onSubmit={sendEmail} className="">
                  <div className="flex flex-col w-full mt-5">
                    <label className="font-bold opacity-80" htmlFor="textAria">
                      Your Notice
                    </label>
                    <textarea
                      name="message"
                      id="textAria"
                      cols="30"
                      rows="6"
                      className="w-full mt-2 px-3 py-2 border border-gray-800/30 outline-none focus:border-sky-500 opacity-80 rounded-md"
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
                      className="btn btn-sm px-10 bg-sky-500 hover:bg-sky-600 text-white rounded-md font-semibold"
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

export default SaleSummeryForm;
