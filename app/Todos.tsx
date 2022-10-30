"use client";

import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import type { TodosResult } from "../types";

export const Todos: FC<{ todos: TodosResult }> = (props) => {
  const [filter, setFilter] = useState("");

  const xxx = useQuery<TodosResult>(
    ["todos"],
    async () => {
      const res = await fetch("api/todos");
      return res.json();
    },
    {
      initialData: { data: [{ name: "", priority: "high" }] },
    }
  );

  return (
    <section>
      Current Todos
      <hr />
      <span>Filter:</span>
      <select value={filter} onChange={(evt) => setFilter(evt.target.value)}>
        <option value="">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <ul>
        {props.todos.data.map((todo, idx) => (
          <li key={idx}>
            {todo.name} - {todo.priority}
          </li>
        ))}
      </ul>
    </section>
  );
};
