import apiClient from "@/app/library/utils/apiClient";
import { useCallback, useEffect, useState } from "react";

export default async function useTable({
  pagination = {
    currentPage: 1,
    pageCount: 10,
  },
}) {
  const columns = [
    { title: "Name", field: "name" },
    { title: "Age", field: "age" },
    // { title: "Email", field: "email" },
  ];

  const [data, setData] = useState([]);

  const getUsers = useCallback(() => {
    apiClient
      .get(
        `/users`,
        // `/users?currentPage=${pagination.currentPage}&pageCount=${pagination.pageCount}`,
      )
      .then((res) => {
        console.log("res:", res);
        setData(res.users);
      });
  }, [pagination]);

  useEffect(() => {
    getUsers();
  }, []);

  return {
    columns,
    data,
    setData,
  };
}
