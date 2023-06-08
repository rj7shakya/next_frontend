"use client";
import React, { useState } from "react";
import styles from "../events/Form.module.css";
import moment from "moment";
import { API_URL } from "../config";
import slugify from "react-slugify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Modal from "./Modal";
import ImageUpload from "./ImageUpload";

const EditPageComponent = ({ evt }) => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: evt?.name,
    performers: evt?.performers,
    venue: evt?.venue,
    address: evt?.address,
    date: evt?.data,
    time: evt?.time,
    description: evt?.description,
  });
  const [imagePreview, setImagePreview] = useState(
    evt?.image ? evt?.image?.data?.attributes?.formats?.thumbnail?.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }

    const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { slug: slugify(values.name), ...values } }),
    });

    if (!res.ok) {
      toast.error("Smthg went wrong!");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt?.data?.attributes?.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = () => {
    console.log("upload");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("YYYY-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} alt="cant load" />
      ) : (
        <div>
          <p>No Image Uploaded</p>
        </div>
      )}

      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </>
  );
};

export default EditPageComponent;
