import Link from "next/link";
import React from "react";

export default function loginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <div className="w-full h-full absolute inset-0 z-[-1] bg-gray-50 blur-[120px]">
        <div className="w-[10rem] h-[10rem] bg-beige-c-100 z-0 absolute right-[3rem] top-[10rem]"></div>
        <div className="w-[10rem] h-[10rem] bg-red-c-100 z-0 absolute left-[20rem] bottom-[10rem]"></div>
        <div className="w-[10rem] h-[10rem] bg-green-c-100 z-0 absolute left-[7rem] bottom-[2rem]"></div>
      </div>

      <Link
        href="/"
        className="group h-[4rem] bg-blue-100 sm:w-[30rem] w-[90%] flex items-center justify-center rounded-xl hover:bg-blue-500"
      >
        <h2 className="font-black text-blue-500 group-hover:text-white ">
          HOME
        </h2>
      </Link>

      <div className="sm:w-[30rem] w-[90%] border rounded-lg bg-white p-8">
        <div className="flex min-h-full flex-1 flex-col justify-center">
          <div className="flex items-center justify-between sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login
            </h2>
            <Link
              className="text-sm  text-blue-500 hover:text-blue-600"
              href="/auth/register"
            >
              Don't have an account?
            </Link>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full px-3 py-3 rounded-md border-0 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-500"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-blue-500 hover:text-blue-700"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full px-3 py-3 rounded-md border-0 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
