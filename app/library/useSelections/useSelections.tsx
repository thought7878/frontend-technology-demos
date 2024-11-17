import useSafeState from "../custom-hooks/useSafeState";
import useCreation from "../custom-hooks/useCreation";
const useSelections = <T,>(lists: T[], initValues: T[] = []) => {
  // 使用useSafeState钩子来管理选定的值数组
  // initValues: 初始化选定值的数组
  const [selected, setSelected] = useSafeState<T[]>(initValues);

  // 通过new Set 去掉重复的选中的数据,转化为数组需要使用Array.from
  // 使用useCreation钩子初始化一个Set对象，该对象用于存储选中的元素
  // 此方法确保仅在selected依赖项变化时才重新创建Set对象，以优化性能
  const selectedSet = useCreation(() => new Set(selected), [selected]);

  /**
   * 检查给定数据是否被选中
   *
   * @param data - 待检查的数据，类型为T
   * @returns 如果数据在selectedSet中，则返回true，否则返回false
   */
  const isSelected = (data: T) => selectedSet.has(data);

  /**
   * 添加元素
   * 此函数用于处理两种情况：当传入单个元素或元素数组时，将其添加到选定集合中
   * 它首先检查传入的数据是否为数组，然后分别处理每种情况
   * 最后，它更新选定集合，并返回新的选定数组
   *
   * @param data - 要添加到选定集合中的元素或元素数组，类型为T或T[]
   * @returns 返回更新后的选定数组
   */
  const addSelect = (data: T | T[]) => {
    // 检查传入的数据是否为数组
    if (Array.isArray(data)) {
      // 如果是数组，遍历每个元素并将其添加到选定集合中
      data.map((item) => selectedSet.add(item));
    } else {
      // 如果不是数组，直接将元素添加到选定集合中
      selectedSet.add(data);
    }
    // 更新选定集合，并返回新的选定数组
    return setSelected(Array.from(selectedSet));
  };

  /**
   * 删除选中的元素
   * 此函数用于从selectedSet中删除传入的元素或元素数组
   * 它首先检查传入的数据是否为数组，然后遍历数组中的每个元素进行删除
   * 如果传入的是单个元素，则直接进行删除
   * 删除完成后，更新selectedSet的值
   *
   * @param data {T | T[]} - 要删除的元素或元素数组
   * @returns {T[]} - 更新后的selectedSet数组形式
   */
  const deleteSelect = (data: T | T[]) => {
    // 判断传入的数据是否为数组
    if (Array.isArray(data)) {
      // 如果是数组，则遍历数组中的每个元素
      data.map((item) => selectedSet.delete(item));
    } else {
      // 如果不是数组，则直接删除该元素
      selectedSet.delete(data);
    }
    // 更新selectedSet的值，并返回其数组形式
    return setSelected(Array.from(selectedSet));
  };

  /**
   * 重置选中项
   * 此函数用于更新选中项的集合，接受单个项或项的数组作为参数
   * 它首先清除当前的选中项集合，然后根据传入的数据重新填充集合，
   * 最后更新选中的状态
   *
   * @param data 单个项或项的数组，表示要设置为选中的项
   * @returns 返回更新后的选中项数组
   */
  const updateSelect = (data: T | T[]) => {
    // 清空当前的选中项集合
    selectedSet.clear();

    // 判断传入的数据是否为数组，如果是，则遍历数组并添加到选中项集合
    if (Array.isArray(data)) {
      data.map((item) => selectedSet.add(item));
    } else {
      // 如果传入的数据不是数组，则直接添加到选中项集合
      selectedSet.add(data);
    }

    // 将选中项集合转换为数组并更新选中的状态
    return setSelected(Array.from(selectedSet));
  };

  /**
   * 切换列表项按钮的状态
   *
   * 此函数用于在两种状态之间进行切换：选择添加或选择删除
   * 它根据给定的数据是否已被选中，来决定是调用selectDel函数还是selectAdd函数
   *
   * @param data - 要进行状态切换的数据项
   */
  const toggleItem = (data: T) =>
    isSelected(data) ? deleteSelect(data) : addSelect(data);

  // 是否全部未选中
  const isSelectedNone = useCreation(
    () => lists.every((ele) => !selectedSet.has(ele)),
    [lists, selectedSet],
  );

  // 是否全部选中
  const isSelectedAll = useCreation(() => {
    return lists.every((ele) => selectedSet.has(ele));
  }, [lists, selectedSet]);

  // 是否半选
  const isSelectedPartially = useCreation(
    () => !isSelectedNone && !isSelectedAll,
    [isSelectedNone, isSelectedAll],
  );

  /**
   * 全选所有项目
   * 将所有列表项添加到选中集合中，并更新选中项数组
   */
  const addAll = () => {
    // 遍历列表，将每个项添加到选中集合中
    lists.map((item) => selectedSet.add(item));
    // 更新选中项数组，以反映集合中的更改
    setSelected(Array.from(selectedSet));
  };

  /**
   * 取消选择所有项目
   *
   * 此函数通过遍历列表中的每个项目，并将其从selectedSet中删除，从而取消选择所有项目
   * 最后，更新selected数组以反映selectedSet中的更改
   */
  const deleteAll = () => {
    // 遍历列表中的每个项目并从selectedSet中删除
    // lists.map((item) => selectedSet.delete(item));
    selectedSet.clear();
    // 更新selected数组以反映selectedSet中的更改
    setSelected(Array.from(selectedSet));
  };

  /**
   * 切换所有项的选中状态
   * 此函数根据当前所有项是否已选中来决定是调用 deleteAll() 还是 addAll()
   * 它的作用是批量选择或取消选择所有项，具体行为取决于当前的选中状态
   */
  const toggleAll = () => (isSelectedAll ? deleteAll() : addAll());

  return {
    selected, // 已经选择的元素组
    isSelected, // 是否被选中
    addSelect,
    deleteSelect,
    toggleItem,
    updateSelect,
    isSelectedNone,
    isSelectedAll,
    isSelectedPartially,
    addAll,
    deleteAll,
    toggleAll,
  } as const;
};

export default useSelections;
