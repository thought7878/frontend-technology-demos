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
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <NumberField
          // TODO: If not use Provider, Bug---TypeError: Cannot read properties of null (reading 'scale')
          // TODO: BUG, 键盘修改值，不会触发 onChange ，直到失去焦点时。貌似不是Bug，https://react-spectrum.adobe.com/react-spectrum/NumberField.html#events
          // onChange={(value) => console.log(value)}
          name="width"
          label="Width"
          labelPosition="side"
          validationBehavior="native"
          isRequired
          // errorMessage的priority比validate的高
          // errorMessage="Required errorMessage"
          // validate={(value) => (value < 0 ? "value must be positive" : true)}
          // validationState='valid'
          // defaultValue={1024}
          // minValue={0}
        />
        <div>
          <input type="submit" value="submit" />
        </div>
      </form>
    </Provider>
  );
}
