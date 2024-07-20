import { searchIncome } from "@/utils/searchIncome";
import { searchName } from "@/utils/searchName";
import { dateReadable } from "@/utils/dateReadable";

export default function RecapCard({
  id,
  type,
  types,
  amount,
  date,
  income,
  handleUpdateModal,
  handleDeleteModal
}) {
  return (
    <div key={id} className="w-full stats shadow my-2">
      <div className="flex justify-between gap-2 stat">
        <div className="flex flex-col gap-2">
          <div className="stat-title">{searchName(type, types)}</div>
          <div className="stat-value">
            {amount}
            <span className="text-sm font-normal">pcs</span>
          </div>
          <div className="stat-desc">{dateReadable(date, types)}</div>
          <div className="stat-desc">
            Income:{" "}
            {income.toLocaleString("id-ID", {
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
                onClick={() => handleUpdateModal(id)}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className="btn btn-sm btn-error"
                onClick={() => handleDeleteModal(id)}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
