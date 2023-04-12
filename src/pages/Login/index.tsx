import { signIn, signUp } from "api/auth";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface formProps {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState<formProps>({
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState<boolean>(
    location?.pathname === "/signup" ? false : true
  );

  const isRegex = !form?.email?.includes("@") || form?.password?.length < 8;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) {
      return;
    }

    const { name, value } = event?.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      await signIn(form?.email, form?.password)
        .then((response: any) => {
          if (response) {
            localStorage.setItem("access_token", response["access_token"]);
            navigate("/todo");
          }
        })
        .catch((error: any) => {
          console.log("error:", error);
          alert(error.response.data.message);
        });
    } else {
      await signUp(form?.email, form?.password)
        .then(async (response) => {
          setIsLogin(true);
          setForm({
            email: "",
            password: "",
          });
          navigate("/signin");
        })
        .catch((error: any) => {
          console.log("error:", error);
          alert(error.response.data.message);
        });
    }
  };

  return (
    <div className="w-screen h-screen  flex  mt-10 p-5 flex-col relative">
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {isLogin ? "로그인을 해주세요." : "회원가입을 해주세요."}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  value={form?.email}
                  autoComplete="email"
                  required
                  data-testid="email-input"
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3.5 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="이메일은 @를 포함하여 입력해주세요."
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  data-testid="password-input"
                  name="password"
                  type="password"
                  value={form?.password}
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3.5 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="비밀번호는 8자 이상 입력해주세요."
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <strong
                  className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  onClick={async () => {
                    await setIsLogin(!isLogin);
                    await navigate(`${!isLogin ? "/signin" : "/signup"}`);
                  }}
                >
                  {isLogin ? "회원가입으로 이동" : "로그인으로 이동"}
                </strong>
              </div>
            </div>

            <div>
              <button
                data-testid={isLogin ? "signin-button" : "signup-button"}
                type="submit"
                disabled={isRegex}
                className={`group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  isRegex ? "opacity-50" : "opacity-100"
                }`}
              >
                {isLogin ? "로그인" : "회원가입"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
