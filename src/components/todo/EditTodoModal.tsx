import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FormEvent, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAppDispatch } from "@/redux/hooks";
import { editTodo } from "@/redux/features/todoSlice";
import { useUpdateTodosMutation } from "@/redux/api/api";

type TTodoEditProps = {
  todo: {
    title: string;
    description: string;
    _id: string;
    isCompleted: boolean;
    priority: string;
  };
};

const EditTodoModal = ({ todo }: TTodoEditProps) => {
  const [task, setTask] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);
  const [editTodo, { isLoading }] = useUpdateTodosMutation();
  // for local state
  // const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const taskDetaile = {
      _id: todo._id,
      title: task,
      description: newDescription,
      isCompleted: todo.isCompleted,
      priority: todo.priority,
    };

    const options = {
      id: todo._id,
      data: taskDetaile,
    };
    editTodo(options);
    // dispatch(editTodo(taskDetaile));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5C52FE]">
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
          <DialogDescription>
            Edit your tasks that you want to finish.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-right">
                Task
              </Label>
              <Input
                onBlur={(e) => setTask(e.target.value)}
                defaultValue={todo.title}
                id="task"
                className="col-span-3"
                placeholder="Task name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                onBlur={(e) => setNewDescription(e.target.value)}
                defaultValue={todo.description}
                id="description"
                className="col-span-3"
                placeholder="Type your task here."
              />
            </div>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoModal;
