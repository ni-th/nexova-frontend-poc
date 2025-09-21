import React, { useState, useEffect } from "react";
import { FaAngleDown, FaMagnifyingGlass } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";
import type { DBConfig, EmailConfig, SmsConfig } from "../types/config";
import { Loader } from "../components/Loader";

const ConfigManagent: React.FC = () => {
  // useStates
  const [submitError, setSubmitError] = useState<Record<string, string>>({});

  const [config, setConfig] = useState({
    db: { host: "", username: "", port: null, password: "", databaseName: "" },
    email: { api_key: "", sender_email: "" },
    sms: { api_key: "", sender_phone: "" },
  });

  // show db table data
  const [dbData, setDbData] = useState<DBConfig[]>([]);
  const [dbDataFiltered, setDbDataFiltered] = useState<DBConfig[]>([]);
  const [dbLoading, setDbLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // const [smsData, setSmsData] = useState<SmsConfig[]>([]);
  // const [smsLoading, setSmsLoading] = useState(false);
  // const [smsError, setSmsError] = useState<string | null>(null);

  // const [emailData, setEmailData] = useState<EmailConfig[]>([]);
  // const [emailLoading, setEmailLoading] = useState(false);
  // const [emailError, setEmailError] = useState<string | null>(null);

  //  input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "db" | "email" | "sms"
  ) => {
    const { id, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [type]: { ...prev[type], [id]: id === "port" ? Number(value) : value },
    }));
  };

  // form submitions
  const handleSubmit = async (
    e: React.FormEvent,
    type: "db" | "email" | "sms"
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/config/${type}/add`,
        config[type]
      );
      console.log("Config sent:", response.data);
      fetchData(); // fetch added data when submit the button
      // setDbData((prev) => [...prev, config[type] as DBConfig]);
      setSubmitError({}); // set submit alert to initial state when submit this form
      Swal.fire({
        title: `${type} configurations saved successfully !`,
        icon: "success",
        draggable: true,
      });
    } catch (error: unknown) {
      console.error("Error sending config:", error);

      let errorMessage = "An unknown error occurred.";

      if (axios.isAxiosError(error)) {
        if (!error.response) {
          errorMessage = "Network error. Please check your connection.";
          setSubmitError({ General: errorMessage });
        } else {
          const data = error.response.data;

          if (data && typeof data === "object") {
            // If backend sends { message: "...error..." }
            if ("message" in data && typeof data.message === "string") {
              errorMessage = data.message;
              setSubmitError({ General: errorMessage });
            } else {
              setSubmitError(data as Record<string, string>);
            }
          }
        }
      } else {
        errorMessage = "Unexpected error occurred. Please try again.";
        setSubmitError({ General: errorMessage });
      }

      Swal.fire({
        title: `${type} configurations not saved!`,
        icon: "error",
        draggable: true,
      });
    }
  };

  const fetchData = async () => {
    setDbLoading(true); // start loading
    setDbError(null); // clear previous errors
    try {
      const response = await axios.get<DBConfig[]>(
        "http://localhost:8080/config/db/find-all"
      );
      setDbData(response.data);
      setDbDataFiltered(response.data)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage = "An unknown error occurred.";
        if (!err.response) {
          setDbError("Network error: server not reachable");
        } else {
          const data = err.response.data;
          if (data && typeof data === "object") {
            if ("message" in data && typeof data.message === "string") {
              setDbError(data.message);
            } else {
              setDbError(data as string);
            }
          } else {
            setDbError(errorMessage);
          }
        }
      }
    } finally {
      setDbLoading(false); // stop loading
    }
  };

  useEffect(() => {
    fetchData();// fetch data when page loads
  }, []);

  const handleDelete = async (id: number | undefined) => {
    console.log(dbData);
    try {
      const response = await axios.delete(
        `http://localhost:8080/config/db/delete/${id}`
      );
      setDbDataFiltered((prevData) => prevData.filter((item) => item.id !== id));
      if (response.status === 202) {
        Swal.fire({
          title: "Database deleted",
          icon: "success",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = "An unknown error occurred.";
        if (!error.response) {
          Swal.fire({
            title: `Network error: server not reachable`,
            icon: "error",
          });
        } else {
          const data = error.response.data;
          if (data && typeof data === "object") {
            if ("message" in data && typeof data.message === "string") {
              Swal.fire({
                title: data.message,
                icon: "error",
              });
            } else {
              Swal.fire({
                title: "Db not deleted",
                icon: "error",
              });
            }
          } else {
            Swal.fire({
              title: errorMessage,
              icon: "error",
            });
          }
        }
      } else {
        Swal.fire({
          title: "Unexpected error occurred. Please try again.",
          icon: "error",
        });
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDbDataFiltered(
      dbData.filter((item) =>
        item.databaseName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse" className="ms-2">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
        >
          <span>Add DB details</span>
          <FaAngleDown />
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className="hidden"
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <form onSubmit={(e) => handleSubmit(e, "db")} className="mb-3">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="host"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Host
                </label>
                <input
                  value={config.db.host}
                  onChange={(e) => handleChange(e, "db")}
                  type="text"
                  id="host"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="localhost"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User Name
                </label>
                <input
                  value={config.db.username}
                  onChange={(e) => handleChange(e, "db")}
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="port"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Port
                </label>
                <input
                  value={config.db.port ?? ""}
                  onChange={(e) => handleChange(e, "db")}
                  type="number"
                  id="port"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="3306"
                  required
                  min={1024}
                  max={65535}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  value={config.db.password}
                  onChange={(e) => handleChange(e, "db")}
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label
                  htmlFor="databaseName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Database
                </label>
                <input
                  value={config.db.databaseName}
                  onChange={(e) => handleChange(e, "db")}
                  type="text"
                  id="databaseName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="mydb"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
          {Object.values(submitError).length > 0 && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <ul>
                {Object.values(submitError).map((v, i) => (
                  <li key={i}>
                    <span className="font-medium">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {dbLoading && <Loader />}
          {dbError && (
            <div
              className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <span className="font-medium">Error: </span> {dbError}
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FaMagnifyingGlass />
            </div>
            <input
              onChange={(e) => handleSearch(e)}
              type="text"
              id="db-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search db"
              required
            />
          </div>
          {dbDataFiltered.length > 0 && (
            <>
              <div className="relative overflow-x-auto mt-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Database
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Host
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Port
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dbDataFiltered.map((item) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.databaseName}
                        </th>
                        <td className="px-6 py-4">{item.host}</td>
                        <td className="px-6 py-4">{item.port}</td>
                        <td className="px-6 py-4">{item.username}</td>
                        <td className="px-6 pt-2">
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      <h2 id="accordion-collapse-heading-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200  dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-collapse-body-2"
          aria-expanded="false"
          aria-controls="accordion-collapse-body-2"
        >
          <span>Add Email details</span>
          <FaAngleDown />
        </button>
      </h2>
      <div
        id="accordion-collapse-body-2"
        className="hidden"
        aria-labelledby="accordion-collapse-heading-2"
      >
        <form className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="api-key"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Api Key
              </label>
              <input
                type="text"
                id="api-key"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="sender-email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sender Email
              </label>
              <input
                type="email"
                id="sender-email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </div>

      <h2 id="accordion-collapse-heading-3">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200  dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-collapse-body-3"
          aria-expanded="false"
          aria-controls="accordion-collapse-body-3"
        >
          <span>Add SMS details</span>
          <FaAngleDown />
        </button>
      </h2>
      <div
        id="accordion-collapse-body-3"
        className="hidden"
        aria-labelledby="accordion-collapse-heading-3"
      >
        <form className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="sms-api-key"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Api Key
              </label>
              <input
                type="text"
                id="sms-api-key"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="sender-number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sender Phone Number
              </label>
              <input
                type="number"
                id="sender-number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfigManagent;
