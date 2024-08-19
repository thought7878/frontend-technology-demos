import React from "react";
import { z } from "zod";

// 定义一个模式
const userSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(), // 必须是正整数
  email: z.string().email(), // 必须是有效的电子邮件地址
});
function Page() {
  // 验证数据
  try {
    const data = { name: "John Doe", age: 30, email: "john.doe@example.com" };
    const validatedData = userSchema.parse(data);
    console.log("Validated Data:", validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.issues);
    } else {
      console.error("Unexpected error:", error);
    }
  }

  return <div>Page</div>;
}

export default Page;
