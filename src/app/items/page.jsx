"use client";

import { useEffect, useState } from "react";
import { fetchAPI, updateAPI, createAPI } from "../../utils/api";
import TypeCard from "@/components/TypeCard";

export default function Items() {
  const [types, setTypes] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const addTypeDialog = document.getElementById("add_type");
      const editTypeDialog = document.getElementById("edit_type");

      if (addTypeDialog && !addTypeDialog.showModal) {
        dialogPolyfill.registerDialog(addTypeDialog);
      }
      if (editTypeDialog && !editTypeDialog.showModal) {
        dialogPolyfill.registerDialog(editTypeDialog);
      }
    }
  }, []);

  useEffect(() => {
    const fetchTypesData = async () => {
      fetchAPI("types")
        .then(data => {
          setTypes(data);
          console.log("Data fetched:", data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    };

    fetchTypesData();
  }, []);

  const handleUpdate = async id => {
    const data = {
      name: name,
      price: price
    };

    updateAPI("types", id, data)
      .then(response => {
        setName("");
        setPrice("");
        console.log("Data updated:", response);
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  const handleUpdateModal = id => {
    setUpdateId(id);
    const editType = types.find(type => type.id === id);
    setName(editType.name);
    setPrice(editType.price);
    document.getElementById("edit_type").showModal();
  };

  const handleConfirmUpdate = async () => {
    try {
      await handleUpdate(updateId);
      setUpdateId(null);
    } catch (error) {
      console.error("Error confirming delete:", error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      name: name,
      price: price
    };

    createAPI("types", data)
      .then(response => {
        setName("");
        setPrice("");
        console.log("Data created:", response);
      })
      .catch(error => {
        console.error("Error creating data:", error);
      });
  };

  return (
    <div className="w-full flex flex-col px-4 py-20">
      <h1 className="text-2xl font-bold mb-2">Type List</h1>
      <ul>
        {types.map(type => (
          <TypeCard
            id={type.id}
            name={type.name}
            price={type.price}
            handleUpdateModal={handleUpdateModal}
          />
        ))}
      </ul>
      <div className="fixed w-fit bottom-20 right-4">
        <div className="tooltip tooltip-left" data-tip="Add new type">
          <button
            className="btn btn-square btn-info flex justify-center items-center"
            onClick={() => document.getElementById("add_type").showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 448 512"
              stroke="currentColor"
              fill="currentColor"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </button>
        </div>
      </div>
      {typeof window !== "undefined" && (
        <>
          <dialog id="add_type" className="modal">
            <div className="modal-box flex flex-col gap-4">
              <h3 className="font-bold text-lg">Add new type</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered input-sm w-full max-w-xs"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered input-sm w-full max-w-xs"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-info">
                  Submit
                </button>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog id="edit_type" className="modal">
            <div className="modal-box flex flex-col gap-4">
              <h3 className="font-bold text-lg">Edit type</h3>
              <form
                onSubmit={handleConfirmUpdate}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered input-sm w-full max-w-xs"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered input-sm w-full max-w-xs"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                />
                <div className="w-full flex gap-2">
                  <button type="submit" className="w-1/2 btn btn-info">
                    Edit
                  </button>
                  <form className="w-1/2" method="dialog">
                    <button
                      className="w-full btn btn-error"
                      onClick={() => {
                        setName("");
                        setPrice("");
                      }}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </form>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
}
