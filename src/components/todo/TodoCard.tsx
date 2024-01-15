import { useAppDispatch } from "@/redux/hooks";
import { Button } from "../ui/button";
import { toggleStatus, removeTodo } from "@/redux/features/todoSlice";
import EditTodoModal from "./EditTodoModal";
import {
  useDeleteTodosMutation,
  useUpdateTodosMutation,
} from "@/redux/api/api";
type TTodoCardProps = {
  todo: {
    _id: string;
    title: string;
    description: string;
    priority: string;
    isCompleted?: boolean;
  };
};
const TodoCard = ({ todo }: TTodoCardProps) => {
  const dispatch = useAppDispatch();
  const [updateTodo, { isLoading }] = useUpdateTodosMutation();
  const [deleteTodo, { isError }] = useDeleteTodosMutation();

  const toggleState = () => {
    // for local state
    // dispatch(toggleStatus(todo.id));

    const updatedTodo = {
      isCompleted: !todo.isCompleted,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
    };

    const options = {
      id: todo._id,
      data: updatedTodo,
    };

    updateTodo(options);
  };
  return (
    <div className="bg-white rounded-md flex  items-center p-3 border">
      <div className="flex flex-1 items-center gap-2">
        <input
          onChange={toggleState}
          type="checkbox"
          name="complete"
          id="complete"
          defaultChecked={todo.isCompleted}
        />
        <p className="font-semibold">{todo?.title}</p>
      </div>
      {/* <p>Time</p> */}
      <div className="flex  flex-1 items-center gap-1">
        <div
          className={`${
            (todo.priority === "high" && `size-3 rounded-full bg-red-500`) ||
            (todo.priority === "medium" &&
              `size-3 rounded-full bg-yellow-500`) ||
            (todo.priority === "low" && `size-3 rounded-full bg-green-500`)
          }`}
        ></div>{" "}
        {todo?.priority}
      </div>
      <div className="flex-1">
        {todo.isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">Pending</p>
        )}
      </div>
      <p className="flex-1">{todo?.description}</p>
      <div className="space-x-5 ">
        <Button onClick={() => deleteTodo(todo._id)} className="bg-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>
        <EditTodoModal
          title={todo.title}
          description={todo.description}
          id={todo.id}
        ></EditTodoModal>
      </div>
    </div>
  );
};

export default TodoCard;
