"use client";
import React from "react";
/**
 *
 * @param {*} defaultQuery  表单查询默认参数
 * @param {*} api           biaog
 */
export function useQueryTable(defaultQuery = {}, api) {
  /* 表单信息 */
  const formData = React.useRef({});
  /* 分页信息 */
  const pagination = React.useRef({
    page: defaultQuery.page || 1,
    pageSize: defaultQuery.pageSize || 10,
  });
  /* 表格数据 */
  const [tableData, setTableData] = React.useState({
    data: [],
    total: 0,
    current: 1,
  });

  /* 强制更新 */
  const [, forceUpdate] = React.useState(null);

  /* 请求列表数据 */
  const getList = React.useCallback(
    async function (payload = {}) {
      if (!api) return;
      const data =
        (await api({
          ...defaultQuery,
          ...payload,
          ...pagination.current, //使用了ref，因此不需要依赖
          ...formData.current, //使用了ref，因此不需要依赖
        })) || {};
      if (data.code == 200) {
        setTableData({
          list: data.list,
          current: data.current,
          total: data.total,
        });
      } else {
      }
    },
    [api, defaultQuery],
  ); /* 以api作为依赖项，当api改变，重新声明getList */

  /* 改变表单数据/单元项 */
  const setFormItem = React.useCallback(function (key, value) {
    const form = formData.current;
    form[key] = value;
    forceUpdate({}); /* forceUpdate 每一次都能更新，不会造成 state 相等的情况 */
  }, []);

  /* 重置表单 */
  const reset = React.useCallback(
    function () {
      const current = formData.current;
      for (let name in current) {
        current[name] = "";
      }
      pagination.current.page = defaultQuery.page || 1;
      pagination.current.pageSize = defaultQuery.pageSize || 10;
      /* 请求数据  */
      getList();
    },
    [getList, pagination, defaultQuery],
  ); /* getList 作为 reset 的依赖项  */

  /* 处理分页逻辑 */
  const changePagination = React.useCallback(
    async function (page, pageSize) {
      pagination.current = {
        page,
        pageSize,
      };
      getList();
    },
    [getList],
  ); /* getList 作为 changePagination 的依赖项  */

  /* 初始化请求数据 */
  React.useEffect(() => {
    getList();
  }, []);

  /* 组合暴露参数 */
  return [
    {
      /* 组合表格状态 */
      tableData,
      getList,
      pagination: pagination.current,
      changePagination,
    },
    {
      /* 组合搜索表单状态 */
      formData: formData.current,
      setFormItem,
      reset,
    },
  ];
}
