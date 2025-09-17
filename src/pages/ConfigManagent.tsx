import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import axios from "axios";

interface DBConfig{
  host: string;
  username: string;
  port: number;
  password: string;
  databaseName: string;
}
const ConfigManagent: React.FC = () => {
  const[dbConfig, setDbConfig] = useState<DBConfig>({
    host: "",
    username: "",
    port: 0,
    password: "",
    databaseName: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDbConfig((prev) => ({...prev,[id]: id === "port" ? Number(value) : value,}));
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/config/db/add", dbConfig);
      console.log("Config sent:", response.data);
      alert("Configuration saved successfully!");
    } catch (error) {
      console.error("Error sending config:", error);
      alert("Failed to save configuration!");
    }
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
        <form onSubmit={handleSubmit} className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="host"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Host
              </label>
              <input
                value={dbConfig.host}
                onChange={handleChange}
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
               value={dbConfig.username}
                onChange={handleChange}
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
              value={dbConfig.port}
          onChange={handleChange}
                type="number"
                id="port"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="3306"
                required
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
              value={dbConfig.password}
          onChange={handleChange}
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
              value={dbConfig.databaseName}
          onChange={handleChange}
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
