"use client";

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
// 导入zodResolver用于表单验证
import { zodResolver } from "@hookform/resolvers/zod";
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
  // 用户名必须至少为2个字符
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
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
    },
  });

  // 2. 定义一个提交处理函数
  function onSubmit(values: z.infer<typeof formSchema>) {
    // 对表单值进行处理
    // ✅ 这将是类型安全和验证过的
    console.log(values);
  }

  // 返回表单组件
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 用户名输入字段 */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your password.</FormDescription>
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
