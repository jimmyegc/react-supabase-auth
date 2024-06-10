import { Todo } from "../components/Todo.type";
import { supabase } from "./supabase.service";

export const getTodos = async () => {
  const { data, error } = await supabase.from("Todo").select();
  if (error) throw error;
  return data;
};

export const createTodo = async (title: string, description: string) => {
  const { error } = await supabase.from("Todo").insert({ title, description });
  if (error) throw error;
};

export const deleteTodo = async (id: number) => {
  const { error } = await supabase.from("Todo").delete().eq("id", id);
  if (error) throw error;
};

export const checkTodo = async (id: number, newValue: boolean) => {
  const { error } = await supabase
    .from("Todo")
    .update({ isCompleted: newValue })
    .eq("id", id);
  if (error) throw error;
};
