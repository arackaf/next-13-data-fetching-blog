"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import type { TodosResult } from "../types";

export const Todos: FC<{ initialTodos: TodosResult }> = (props) => {
  const [filter, setFilter] = useState("");

  const client = useQueryClient();

  useState(() => {
    client.setQueryData(["todos", filter], props.initialTodos);
  });

  const { data: todos } = useQuery<TodosResult>(
    ["todos", filter],
    async () => {
      const res = await fetch(`api/todos?filter=${filter}`);
      return res.json();
    },
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const [counterValue, setCounterVal] = useState(0);
  const [showSecondList, setShowSecondList] = useState(false);

  return (
    <section>
      {counterValue} <button onClick={() => setCounterVal((x) => x + 1)}>Inc</button>
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
        {(todos?.data ?? []).map((todo, idx) => (
          <li key={idx}>
            {todo.name} - {todo.priority}
          </li>
        ))}
      </ul>
      <br />
      <button onClick={() => setShowSecondList((val) => !val)}>Show second list</button>
      {showSecondList ? <SecondList /> : null}
    </section>
  );
};

const SecondList = () => {
  const { data: todos } = useQuery<TodosResult>(
    ["todos", ""],
    async () => {
      const res = await fetch(`api/todos`);
      return res.json();
    },
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  return (
    <ul>
      {(todos?.data ?? []).map((todo, idx) => (
        <li key={idx}>
          {todo.name} - {todo.priority}
        </li>
      ))}
    </ul>
  );
};
