"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/api";
import * as XLSX from "xlsx";

export default function Home() {
  const [recaps, setRecaps] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredRecaps, setFilteredRecaps] = useState([]);
  const [groupedByType, setGroupedByType] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [targetYear, setTargetYear] = useState("");
  const [targetMonth, setTargetMonth] = useState("");
  const [previousMonthIncome, setPreviousMonthIncome] = useState(0);

  useEffect(() => {
    const fetchRecapsData = async () => {
      try {
        const recapsData = await fetchAPI("recaps");
        setRecaps(recapsData);
      } catch (error) {
        console.error("Error fetching recaps:", error);
      }
    };

    const fetchTypesData = async () => {
      try {
        const typesData = await fetchAPI("types");
        setTypes(typesData);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchRecapsData(), fetchTypesData()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    setTargetYear(currentDate.getFullYear());
    setTargetMonth(currentDate.getMonth() + 1);

    setSelectedYear(targetYear);
    setSelectedMonth(targetMonth.toString());
  }, [targetYear, targetMonth]);

  useEffect(() => {
    const filterAndGroupData = () => {
      const filteredData = filterByMonthAndYear(
        recaps,
        parseInt(selectedMonth),
        parseInt(selectedYear)
      );
      setFilteredRecaps(filteredData);
      const groupedData = groupByType(filteredData);
      setGroupedByType(groupedData);
    };

    if (recaps.length > 0 && types.length > 0) {
      filterAndGroupData();
    }
  }, [selectedYear, selectedMonth, recaps, types]);

  useEffect(() => {
    const selectedYearInt = parseInt(selectedYear);
    const selectedMonthInt = parseInt(selectedMonth);

    let previousMonth = selectedMonthInt - 1;
    let previousYear = selectedYearInt;

    if (previousMonth === 0) {
      previousMonth = 12;
      previousYear -= 1;
    }

    const filteredPreviousMonthData = filterByMonthAndYear(
      recaps,
      previousMonth,
      previousYear
    );

    const totalPreviousMonthIncome = filteredPreviousMonthData.reduce(
      (accumulator, currentValue) => accumulator + currentValue.income,
      0
    );

    setPreviousMonthIncome(totalPreviousMonthIncome);
  }, [selectedYear, selectedMonth, recaps]);

  function getMonthName(monthNumber) {
    const date = new Date(Date.UTC(2000, monthNumber - 1, 1));
    return date.toLocaleString("id-ID", { month: "long" });
  }

  function filterByMonthAndYear(data, month, year) {
    return data.filter(item => {
      const date = new Date(item.date);
      return date.getUTCMonth() === month - 1 && date.getUTCFullYear() === year;
    });
  }

  function groupByType(data) {
    const grouped = {};
    data.forEach(item => {
      const type = item.type;
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(item);
    });
    return grouped;
  }

  function searchName(id) {
    const name = types.find(type => type.id == id)?.name;
    return name;
  }

  function searchPrice(id) {
    const price = types
      .find(type => type.id == id)
      ?.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    return price;
  }

  const getTotalIncomeCurrentMonth = () => {
    const totalIncome = filteredRecaps.reduce(
      (accumulator, currentValue) => accumulator + currentValue.income,
      0
    );

    return totalIncome;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

  function changeFormatDate(date) {
    let partsDate = date.split("-");
    let newDate = `${partsDate[2]}/${partsDate[1]}/${partsDate[0]}`;

    return newDate;
  }

  const getPercentageChange = () => {
    if (previousMonthIncome === 0) {
      return 0;
    }

    const currentMonthIncome = getTotalIncomeCurrentMonth();

    const change = currentMonthIncome - previousMonthIncome;
    const percentageChange = (change / previousMonthIncome) * 100;

    return percentageChange.toFixed(2);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);

    let rowIndex = 0;
    let colIndex = 0;

    for (const type in groupedByType) {
      if (groupedByType.hasOwnProperty(type)) {
        const data = groupedByType[type].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const sheetName = searchName(type);

        const monthlyIncome = getTotalIncomeCurrentMonth().toLocaleString(
          "id-ID",
          {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }
        );

        const filteredData = data.map(item => [
          `${item.amount} pcs`,
          changeFormatDate(item.date)
        ]);

        const sheetPrice = searchPrice(type);

        const totalIncome = data
          .reduce((total, item) => total + item.income, 0)
          .toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });

        const totalAmount = data.reduce(
          (total, item) => total + item.amount,
          0
        );

        filteredData.push([""]);

        filteredData.push([
          `${totalAmount} pcs × ${sheetPrice} = ${totalIncome}`
        ]);

        XLSX.utils.sheet_add_aoa(
          ws,
          [[`Total Penghasilan: ${monthlyIncome}`]],
          {
            origin: XLSX.utils.encode_cell({ r: 0, c: 0 })
          }
        );

        XLSX.utils.sheet_add_aoa(ws, [[`${sheetName}`]], {
          origin: XLSX.utils.encode_cell({ r: rowIndex + 2, c: colIndex })
        });

        XLSX.utils.sheet_add_aoa(ws, filteredData, {
          origin: XLSX.utils.encode_cell({ r: rowIndex + 3, c: colIndex })
        });

        colIndex += filteredData[0].length + 1;

        if (colIndex > 8) {
          colIndex = 0;
          rowIndex += filteredData.length + 2;
        }
      }
    }

    let id =
      new Date().getFullYear().toString() +
      ("0" + (new Date().getMonth() + 1)).slice(-2);

    XLSX.utils.book_append_sheet(wb, ws, `RECAP-${id}`);

    XLSX.writeFile(wb, `RECAP_${id}.xlsx`);
  };

  return (
    <div className="flex flex-col p-4 py-20">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <div className="stats shadow my-2">
        <div className="flex flex-col gap-2 stat">
          <div className="stat-title">Monthly Income</div>
          <div className="stat-value">
            {getTotalIncomeCurrentMonth().toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
          </div>
          <div className="stat-desc">
            {getPercentageChange()}% from the previous month
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <select
          className="select select-bordered select-sm w-full max-w-xs"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
        >
          <option disabled value="">
            Year
          </option>
          {[
            ...new Set(
              recaps
                .map(data => new Date(data.date).getFullYear())
                .sort((a, b) => a - b)
            )
          ].map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered select-sm w-full max-w-xs"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
        >
          <option disabled value="">
            Month
          </option>
          {[
            ...new Set(
              recaps
                .map(data => new Date(data.date).getMonth() + 1)
                .sort((a, b) => a - b)
            )
          ].map(month => (
            <option key={month} value={month.toString()}>
              {getMonthName(month)}
            </option>
          ))}
        </select>
      </div>
      <div className="divider">{getMonthName(parseInt(selectedMonth))}</div>
      {Object.keys(groupedByType).map(type => (
        <div key={type}>
          <span className="badge badge-neutral">{searchName(type)}</span>
          <div className="overflow-x-auto">
            <table className="table table-zebra border my-4">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Income</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {groupedByType[type]
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  )
                  .map(item => (
                    <tr key={item.id}>
                      <td>
                        {item.amount}
                        <span className="text-xs"> pcs</span>
                      </td>
                      <td>
                        {item.income.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        })}
                      </td>
                      <td>{humanReadable(item.date)}</td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th>
                    {groupedByType[type]
                      .map(item => item.income)
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                      .toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ))}
      <div className="fixed w-fit bottom-20 right-4">
        <div className="tooltip tooltip-left" data-tip="Download recap">
          <button
            className="btn btn-square btn-info flex justify-center items-center"
            onClick={exportToExcel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 512 512"
              stroke="currentColor"
              fill="currentColor"
            >
              <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
