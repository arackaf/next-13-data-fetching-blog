"use client";

import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import type { TodosResult } from "../types";

export const Todos: FC<{ initialTodos: TodosResult }> = (props) => {
  const [filter, setFilter] = useState("");

  const { data: todos } = useQuery<TodosResult>(
    ["todos", filter],
    async () => {
      const res = await fetch(`api/todos?filter=${filter}`);
      return res.json();
    },
    {
      initialData: () => (filter === "" ? props.initialTodos : undefined),
      staleTime: 5000,
      keepPreviousData: true,
    }
  );

  const [x, setX] = useState(0);

  return (
    <section>
      {x} <button onClick={() => setX((x) => x + 1)}>Inc</button>
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
        {todos!.data.map((todo, idx) => (
          <li key={idx}>
            {todo.name} - {todo.priority}
          </li>
        ))}
      </ul>
    </section>
  );
};
