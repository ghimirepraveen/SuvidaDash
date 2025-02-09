import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import BookingTable from "../components/bookingTable";
import { Input, Select, message } from "antd";
import { useBookingData } from "../hooks/useBookingData";

const BookingAll = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(undefined);
  //   const [isBlocked, setIsBlocked] = useState(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    isBlocked: "",
  });

  const { data, isError, error } = useBookingData(query);

  useEffect(() => {
    if (data?.data?.pagination?.total) {
      setTotal(data.data.pagination.total);
    }
  }, [data]);

  const handleStatusChange = (value) => {
    setStatus(value);
    setQuery((prevQuery) => ({
      ...prevQuery,
      status: value,
      page: 1,
    }));
  };

  //   const handleIsBlockedChange = (value) => {
  //     setIsBlocked(value);
  //     setQuery((prevQuery) => ({
  //       ...prevQuery,
  //       isBlocked: value,
  //       page: 1,
  //     }));
  //   };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      message.error("Search text cannot be empty");
      return;
    }
    setQuery((prevQuery) => ({
      ...prevQuery,
      search: search.trim(),
      page: 1,
    }));
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
    setQuery((prevQuery) => ({
      ...prevQuery,
      page,
      limit: pageSize,
    }));
  };

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
            placeholder="Filter by Status"
            style={{ width: 200 }}
            onChange={handleStatusChange}
            value={status}
            allowClear
          >
            <Select.Option value="Requested">Requested</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="Approved">Approved</Select.Option>
            <Select.Option value="Rejected">Rejected</Select.Option>
            <Select.Option value="Not Requested">Not Requested</Select.Option>
          </Select>

          {/* <Select
            placeholder="Filter by Block Status"
            style={{ width: 200 }}
            onChange={handleIsBlockedChange}
            value={isBlocked}
            allowClear
          >
            <Select.Option value="true">True</Select.Option>
            <Select.Option value="false">False</Select.Option>
          </Select> */}
          <Input.Search
            placeholder="Search here"
            style={{ width: 200 }}
            onChange={handleSearchChange}
            value={search}
            onSearch={handleSearch}
          />
        </div>
      </div>
      <BookingTable
        data={data}
        isLoading={!data}
        isError={isError}
        onPageChange={handlePageChange}
        pagination={{ current: page, pageSize: limit, total }}
      />
      {isError && <p>Error loading data: {error?.message}</p>}
    </DashboardLayout>
  );
};

export default BookingAll;
