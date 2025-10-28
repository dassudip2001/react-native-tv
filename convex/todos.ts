import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all todos
export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    return todos;
  },
});

// Create a new todo
export const createTodo = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
    });
    return todoId;
  },
});

// toggle todo completion
export const toggleTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    await ctx.db.patch(args.id, { isCompleted: !todo.isCompleted });
    return todo;
  },
});

// delete a todo
export const deleteTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// clear all todos
export const clearAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();

    // Delete all todos
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }

    return { deletedCount: todos.length };
  },
});
