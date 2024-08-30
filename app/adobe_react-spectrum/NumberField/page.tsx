"use client";
import { NumberField } from "@adobe/react-spectrum";

export default function Page() {
  return (
    <div>
      <NumberField
        // TODO: TypeError: Cannot read properties of null (reading 'scale')
        // TODO: BUG, 键盘修改值，不会触发 onChange ，直到失去焦点时。貌似不是Bug，https://react-spectrum.adobe.com/react-spectrum/NumberField.html#events
        // onChange={(value) => console.log(value)}
        label="Width"
        defaultValue={1024}
        minValue={0}
      />
    </div>
  );
}
