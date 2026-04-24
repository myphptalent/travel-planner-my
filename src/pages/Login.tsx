import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../utils/auth";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const user = {
      id: Date.now(),
      email: data.email,
      name: data.email.split("@")[0],
    };

    login(user);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      
      {/* Header */}
      <Header />

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            🔐 Login
          </h2>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address.",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}