import { createTodo, deleteTodo, getTodos, updateTodo } from "api/todo";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TodoTypeProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
const Todo = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoTypeProps[]>();
  const [editTodo, setEditTodo] = useState<string>("");

  const [isEditId, setIsEditId] = useState<number | undefined>(undefined);

  // get todoList
  const getTodoList = useCallback(async () => {
    await getTodos().then((respones: any) => {
      if (respones) {
        setTodoList(respones);
      }
    });
  }, []);

  // create todo
  const onCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createTodo(todo).then((response: any) => {
      if (response) {
        getTodoList();
        setTodo("");
      }
    });
  };

  // update todo
  const onUpdateTodo = async (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => {
    await updateTodo(id, todo, isCompleted).then((response) => {
      if (response) {
        setIsEditId(undefined);
        getTodoList();
      }
    });
  };

  // delete todo
  const onDeleteTodo = async (id: number) => {
    await deleteTodo(id).then(() => {
      getTodoList();
    });
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) {
      return;
    }

    const { name, value } = event.target;

    name === "todo" ? setTodo(value) : setEditTodo(value);
  };

  // logout
  const logout = () => {
    if (localStorage.getItem("access_token")) {
      localStorage.removeItem("access_token");
      navigate("/signin");
    }
  };

  useEffect(() => {
    getTodoList();
  }, [getTodoList]);

  return (
    <div className="w-screen h-screen  flex items-center mt-15 p-5 flex-col gap-y-16 relative">
      <button
        type="submit"
        onClick={logout}
        className={`flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
        absolute top-15 right-14`}
      >
        로그아웃
      </button>
      <div className="max-w-xl lg:max-w-lg">
        <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
          Todo List
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          투두리스트에 추가할 내용을 입력 후 추가 버튼을 눌러주세요.
        </p>
        <form className="mt-6 flex max-w-md gap-x-4" onSubmit={onCreateTodo}>
          <label htmlFor="todo" className="sr-only"></label>
          <input
            id="todo"
            name="todo"
            type="todo"
            value={todo}
            autoComplete="todo"
            required
            onChange={handleChangeInput}
            data-testid="new-todo-input"
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Please enter the contents"
          />
          <button
            type="submit"
            disabled={todo?.length === 0}
            data-testid="new-todo-add-button"
            className={`flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
              todo?.length === 0 ? "opacity-50" : "opacity-100"
            }`}
          >
            추가
          </button>
        </form>
      </div>
      <ul className="w-96 flex items-center items-center flex-col gap-y-8">
        {todoList?.length !== 0 &&
          todoList?.map((todo: TodoTypeProps, index: number) => (
            <li
              key={index}
              className="w-full flex items-center justify-between gap-x-4 "
            >
              <input
                type="checkbox"
                checked={todo?.isCompleted}
                onClick={() =>
                  onUpdateTodo(todo?.id, todo?.todo, !todo?.isCompleted)
                }
                onChange={() => {}}
              />
              {isEditId === todo?.id ? (
                <input
                  id="edit"
                  name="edit"
                  type="edit"
                  value={editTodo}
                  autoComplete="edit"
                  required
                  onChange={handleChangeInput}
                  data-testid="new-todo-input"
                  className="w-full flex-auto  px-3.5 rounded-md border-0 bg-white/5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500  sm:leading-6"
                />
              ) : (
                <p className="w-full text-left px-3.5"> {todo?.todo}</p>
              )}

              <div className="flex items-center gap-x-4 ">
                <button
                  type="submit"
                  data-testid={
                    todo?.id === isEditId ? "submit-button" : "modify-button"
                  }
                  onClick={() => {
                    if (todo?.id === isEditId) {
                      onUpdateTodo(todo.id, editTodo, todo.isCompleted);
                    } else {
                      setIsEditId(todo?.id);
                      setEditTodo(todo?.todo);
                    }
                  }}
                  className={`flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 `}
                >
                  {todo?.id === isEditId ? "제출" : "수정"}
                </button>
                <button
                  type="submit"
                  data-testid={
                    todo?.id === isEditId ? "cancel-button" : "delete-button"
                  }
                  onClick={() => {
                    if (todo?.id === isEditId) {
                      setIsEditId(undefined);
                    } else {
                      onDeleteTodo(todo?.id);
                    }
                  }}
                  className={`flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
                >
                  {todo?.id === isEditId ? "취소" : "삭제"}
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todo;
