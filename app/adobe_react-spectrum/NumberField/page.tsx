"use client";
import { NumberField, defaultTheme, Provider } from "@adobe/react-spectrum";

export default function Page() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 获取表单元素的值
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const width = formData.get("width");

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("width:", width);
  };

  return (
    <Provider theme={defaultTheme}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />

        <NumberField
          // TODO: If not use Provider, Bug---TypeError: Cannot read properties of null (reading 'scale')
          // TODO: BUG, 键盘修改值，不会触发 onChange ，直到失去焦点时。貌似不是Bug，https://react-spectrum.adobe.com/react-spectrum/NumberField.html#events
          // onChange={(value) => console.log(value)}
          name="width"
          label="Width"
          defaultValue={1024}
          minValue={0}
        />
        <input type="submit" value="submit" />
      </form>
    </Provider>
  );
}
