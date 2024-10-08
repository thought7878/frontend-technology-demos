"use client";

import { create } from "@/app/actions/input";
// 导入Button组件
import { Button } from "@/components/ui/button";
// 导入Form相关的组件和钩子
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/my-number-input";
// 导入zodResolver用于表单验证
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
// 导入useForm钩子用于React表单处理
import { useForm } from "react-hook-form";
// 导入z用于定义表单的验证规则
import { z } from "zod";

// 定义表单的验证规则
const formSchema = z.object({
  // 用户名必须至少为2个字符
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // password必须至少为8个字符
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  amount: z.number().nonnegative(),
});

// ProfileForm组件用于展示和处理用户表单
export default function ProfileForm() {
  // 1. 定义你的表单
  const form = useForm<z.infer<typeof formSchema>>({
    // 使用zodResolver进行表单验证
    resolver: zodResolver(formSchema),
    // 默认表单值
    defaultValues: {
      username: "",
      password: "",
      amount: 0,
    },
  });

  // 2. 定义一个提交处理函数
  function onSubmit(values: z.infer<typeof formSchema>) {
    // 对表单值进行处理
    // ✅ 这将是类型安全和验证过的
    console.log(values);

    // 创建 FormData 实例
    const formData = new FormData();

    // 将 values 中的数据添加到 formData
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    // 调用 create 函数
    create(formData);
    // create(values);
  }

  // 返回表单组件
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // action={create}
        className="space-y-8"
      >
        {/* 用户名输入字段 */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 密码输入字段 */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              {/* <FormDescription>This is your password.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* number input */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field: { onChange, value, name } }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <NumberField
                  onChange={onChange}
                  value={value}
                  name="test"
                  // TODO: fix this
                  className="gap-0"
                >
                  <NumberFieldGroup>
                    <NumberFieldDecrement>
                      <ChevronDownIcon className="h-4 w-4" />
                    </NumberFieldDecrement>
                    <NumberFieldInput />
                    <NumberFieldIncrement>
                      <ChevronUpIcon className="h-4 w-4" />
                    </NumberFieldIncrement>
                  </NumberFieldGroup>
                </NumberField>
              </FormControl>
              {/* <FormDescription>This is amount.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 提交按钮 */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
