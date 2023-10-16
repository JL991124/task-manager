import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Task } from "./type/task.types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return JSON.parse(savedTasks || "[]");
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, dueDate: string, category: string) => {
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        title: title,
        dueDate: dueDate,
        category: category,
      },
    ]);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks
        .filter((task) => task.id !== id) // delete
        .map((task, index) => ({ ...task, id: index + 1 })); // re-order id
      return updatedTasks;
    });
  };

  return (
    <Container>
      <Row className="my-3">
        <TaskForm onAdd={addTask} />
      </Row>
      <Row>
        <TaskList tasks={tasks} onDelete={deleteTask} />
      </Row>
    </Container>
  );
}

export default App;
