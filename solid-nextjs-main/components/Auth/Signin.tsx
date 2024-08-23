"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link"; // Add this line

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send a POST request to the login endpoint
      console.log("avant request")
      const response = await axios.post('http://localhost:8000/hosting/login/', data);
      console.log("b3at request ")
      const { role } = response.data;
      console.log("jab data w role howa", role)
      // Redirect based on the role
      if (role === 'client') {
        console.log("dkhal raho client ")
        router.push('/client'); // Replace with the actual route for Component 1
      } else {
        console.log("Noooo ")
        router.push('/client'); // Replace with the actual route for Component 2
      }
    } catch (err: any) {
      // Handle any errors that occur during the request
      setError(err.response?.data?.detail || 'An error occurred.');
    }
  };

  return (
    <>
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          {/* Your existing layout code */}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
              />
            </div>

            {/* Display any error messages */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex flex-wrap items-center gap-10 md:justify-between xl:gap-15">
              <button
                type="submit"
                aria-label="login with email and password"
                className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
              >
                Log in
                <svg
                  className="fill-white"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                    fill=""
                  />
                </svg>
              </button>
            </div>

            <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
              <p>
                Don't have an account?{" "}
                <Link
                  className="text-black hover:text-primary dark:text-white hover:dark:text-primary"
                  href="/auth/signup"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signin;
