"use client";

import React, { useEffect, useState } from "react";
import { fetchAPI, createAPI, deleteAPI, updateAPI } from "../../utils/api";

export default function Recaps() {
  const [recaps, setRecaps] = useState([]);
  const [types, setTypes] = useState([]);
  const [amount, setAmount] = useState("");
  const [income, setIncome] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    const fetchRecapsData = async () => {
      fetchAPI("recaps")
        .then(data => {
          setRecaps(data);
          console.log("Data fetched:", data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    };

    fetchRecapsData();
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

  function humanReadable(str) {
    const date = new Date(str);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    const humanReadableDate = date.toLocaleDateString("id-ID", options);
    return humanReadableDate;
  }

  function searchName(id) {
    const name = types.find(type => type.id == id)?.name;
    return name;
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const price = types.find(type => type.id === selectedType)?.price;
    const totalIncome = parseInt(amount) * price;

    const data = {
      amount: amount,
      type: selectedType,
      date: new Date(),
      income: totalIncome
    };

    createAPI("recaps", data)
      .then(response => {
        setAmount("");
        setSelectedType("");
        setIncome("");
        console.log("Data created:", response);
        fetchRecapsData();
      })
      .catch(error => {
        console.error("Error creating data:", error);
      });
  };

  const handleDelete = async id => {
    deleteAPI("recaps", id)
      .then(response => {
        const updatedRecaps = recaps.filter(recap => recap.id !== id);
        setRecaps(updatedRecaps);
        console.log("Data deleted:", response);
      })
      .catch(error => {
        console.error("Error deleting data:", error);
      });
  };

  const handleDeleteModal = id => {
    setDeleteId(id);
    document.getElementById("delete_recap").showModal();
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await handleDelete(deleteId);
      setDeleteId(null);
    } catch (error) {
      console.error("Error confirming delete:", error);
    }
  };

  const handleUpdate = async id => {
    const price = types.find(type => type.id === selectedType)?.price;
    const totalIncome = parseInt(amount) * price;

    const data = {
      amount: amount,
      type: selectedType,
      date: new Date(),
      income: totalIncome
    };

    updateAPI("recaps", id, data)
      .then(response => {
        setAmount("");
        setSelectedType("");
        setIncome("");
        console.log("Data updated:", response);
        fetchRecapsData();
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };
  const handleUpdateModal = id => {
    setUpdateId(id);
    const editRecap = recaps.find(recap => recap.id === id);
    setAmount(editRecap.amount);
    setSelectedType(editRecap.type);
    searchIncome(editRecap.type);
    document.getElementById("edit_recap").showModal();
  };

  const searchIncome = id => {
    const price = types.find(type => type.id === id)?.price;
    const totalIncome = parseInt(amount) * price;
    setIncome(totalIncome);
  };

  const handleConfirmUpdate = async () => {
    try {
      await handleUpdate(updateId);
      setUpdateId(null);
    } catch (error) {
      console.error("Error confirming delete:", error);
    }
  };

  return (
    <div className="w-full flex flex-col p-4 py-20">
      <h1 className="text-2xl font-bold mb-2">Recap History</h1>
      <ul>
        {recaps.map(recap => (
          <div key={recap.id} className="w-full stats shadow my-2">
            <div className="flex justify-between gap-2 stat">
              <div className="flex flex-col gap-2">
                <div className="stat-title">{searchName(recap.type)}</div>
                <div className="stat-value">
                  {recap.amount}
                  <span className="text-sm font-normal">pcs</span>
                </div>
                <div className="stat-desc">{humanReadable(recap.date)}</div>
                <div className="stat-desc">
                  Income:{" "}
                  {recap.income.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                </div>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-square btn-xs btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    ></path>
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="flex flex-col gap-2 dropdown-content menu bg-base-100 rounded-box z-40 w-36 p-2 shadow"
                >
                  <li>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleUpdateModal(recap.id)}
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteModal(recap.id)}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </ul>
      <div className="fixed w-fit bottom-20 right-4">
        <div className="tooltip tooltip-left" data-tip="Add new recap">
          <button
            className="btn btn-square btn-info flex justify-center items-center"
            onClick={() => document.getElementById("add_recap").showModal()}
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
      <dialog id="add_recap" className="modal">
        <div className="modal-box flex flex-col gap-4">
          <h3 className="font-bold text-lg">Add new recap</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Amount"
              className="input input-bordered input-sm w-full max-w-xs"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={selectedType}
              onChange={e => {
                setSelectedType(e.target.value);
                searchPrice(e.target.value);
              }}
              required
            >
              <option disabled value="">
                Type
              </option>
              {types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-info">
              Submit
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="edit_recap" className="modal">
        <div className="modal-box flex flex-col gap-4">
          <h3 className="font-bold text-lg">Edit recap</h3>
          <form onSubmit={handleConfirmUpdate} className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Amount"
              className="input input-bordered input-sm w-full max-w-xs"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              required
            >
              <option disabled value="">
                Type
              </option>
              {types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <div className="w-full flex gap-2">
              <button type="submit" className="w-1/2 btn btn-info">
                Edit
              </button>
              <form className="w-1/2" method="dialog">
                <button
                  className="w-full btn btn-error"
                  onClick={() => {
                    setAmount("");
                    setSelectedType("");
                    setIncome("");
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
      <dialog id="delete_recap" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete recap</h3>
          <p className="py-4">Are you sure you want to delete this?</p>
          <div className="modal-action">
            <form className="flex gap-2" method="dialog">
              <button className="btn">No</button>
              <button
                className="btn btn-error"
                onClick={() => handleConfirmDelete()}
              >
                Yes
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
