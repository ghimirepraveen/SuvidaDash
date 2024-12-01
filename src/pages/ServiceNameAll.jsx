import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ServiceNameTable from "../components/serviceNameTable";
import { Input, Select, message } from "antd";
import useServiceNameData from "../hooks/useServiceName";

const ServiceNameAll = () => {
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  // const [query, setQuery] = useState({
  //   page: 1,
  //   limit: 10,
  //   search: "",
  //   isActive: "",
  // });

  const { data, isLoading, isError, error } = useServiceNameData();

  //console.log("data", data);
  // Update `isActive` state when filter changes
  // const handleIsActiveChange = (value) => {
  //   setIsActive(value);
  //   setQuery((prevQuery) => ({
  //     ...prevQuery,
  //     isActive: value,
  //     page: 1, // Reset to the first page when the filter changes
  //   }));
  // };
  // const handleSearchChange = (e) => {
  //   setSearch(e.target.value);
  // };
  // const handleSearch = () => {
  //   if (search.trim() === "") {
  //     message.error("Search text is not allowed to be empty");
  //     return;
  //   }
  //   setQuery((prevQuery) => ({
  //     ...prevQuery,
  //     search: search.trim(),
  //     page: 1, // Reset to the first page when a new search is performed
  //   }));
  // };
  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
          <Select
            placeholder="Filter by Active Status"
            style={{ width: 200 }}
            // onChange={handleIsActiveChange}
            value={isActive}
            allowClear
          >
            <Select.Option value="true">Active</Select.Option>
            <Select.Option value="false">Inactive</Select.Option>
          </Select>
          <Input.Search
            placeholder="Search here"
            style={{ width: 200 }}
            // onChange={handleSearchChange}
            value={search}
            // onSearch={handleSearch}
          />
        </div>
      </div>
      <ServiceNameTable
        data={data}
        isLoading={isLoading}
        isError={isError}
        // onPageChange={(page, pageSize) => {
        //   setQuery((prevQuery) => ({
        //     ...prevQuery,
        //     page,
        //     limit: pageSize,
        //   }));
        // }}
      />
      {isError && <p>Error loading data: {error.message}</p>}
    </DashboardLayout>
  );
};

export default ServiceNameAll;
