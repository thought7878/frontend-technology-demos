"use server";

export async function create(formData: FormData) {
  const rawFormData = {
    username: formData.get("username"),
    password: formData.get("password"),
    amount: formData.get("amount"),
  };

  console.log(rawFormData);

  // mutate data
  // revalidate cache
}
