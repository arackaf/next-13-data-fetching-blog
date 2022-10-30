"use client";

import { FC } from "react";
import type { TodosResult } from "../types";

export const Todos: FC<{ todos: TodosResult }> = (props) => {
  return (
    <section>
      Current Todos
      <hr />
      <span>Filter:</span>
      <select>
        <option value="">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <ul>
        {props.todos.data.map((todo) => (
          <li>
            {todo.name} - {todo.priority}
          </li>
        ))}
      </ul>
    </section>
  );
};
