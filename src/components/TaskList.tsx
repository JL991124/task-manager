import { Table, Button } from "react-bootstrap";
import { Task } from "../type/task.types";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  return tasks.length == 0 ? (
    <h6>No task yet.</h6>
  ) : (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Due Date</th>
          <th>Category</th>
          <th>Title</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.dueDate}</td>
            <td>{task.category}</td>
            <td>{task.title}</td>
            <td className="text-center">
              <Button
                variant="outline-danger"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskList;
