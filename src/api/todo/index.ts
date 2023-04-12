import axios from "api/axios";

export const createTodo = (todo: string) => {
  return new Promise(async (resolve, reject) => {
    return await axios
      .post(`/todos`, { todo })
      .then((res) => {
        if (res.status !== 201) {
          reject(res.data);
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getTodos = () => {
  return new Promise(async (resolve, reject) => {
    return await axios
      .get("/todos")
      .then((res) => {
        if (res.status !== 200) {
          reject(res.data);
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateTodo = (id: number, edit: string, isCompleted: boolean) => {
  return new Promise(async (resolve, reject) => {
    return await axios
      .put(`/todos/${id}`, { todo: edit, isCompleted: isCompleted })
      .then((res) => {
        if (res.status !== 200) {
          reject(res.data);
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteTodo = (id: number) => {
  return new Promise(async (resolve, reject) => {
    return await axios
      .delete(`/todos/${id}`)
      .then((res) => {
        if (res.status !== 204) {
          reject(res.data);
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
