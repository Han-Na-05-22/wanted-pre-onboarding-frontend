import axios from "api/axios";

export const signIn = (email: string, password: string) => {
  return new Promise(async (resolve, reject) => {
    return await axios
      .post(`auth/signin`, { email, password })
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

export const signUp = (email: string, password: string) => {
  return new Promise(async (resolve, reject) => {
    return await axios
      .post(`auth/signup`, { email, password })
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
