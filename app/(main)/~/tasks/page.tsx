import { createClient } from "@/lib/server";

// Server Component: fetch directly with the server client, no client-side
// query needed for the initial render. Use lib/queries/tasks.ts from client
// components for mutations (toggling, editing) after this loads.
export default async function TasksPage() {
  const supabase = await createClient();
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .is("deleted_at", null)
    .order("position", { ascending: true });

  return (
    <div className="p-6">
      <h1 className="mb-4 text-lg font-medium">Tasks</h1>
      <ul className="flex flex-col gap-2">
        {tasks?.map((task) => (
          <li
            key={task.id}
            className="rounded-md border border-border px-3 py-2 text-sm"
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
