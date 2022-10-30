import { Todos } from "./Todos";

async function getTodos() {
  const result = await fetch("http://localhost:3000/api/todos", { cache: "no-store" });
  return result.json();
}

export default async function Page() {
  const todosPromise = getTodos();

  const todos = await todosPromise;
  console.log(todos);
  return (
    <main>
      <Todos todos={todos} />
    </main>
  );
}
