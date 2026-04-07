import { useState } from "react";
import googleIcon from "../assets/googleIcon.svg";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("올바른 이메일 형식을 입력해주세요"),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      setError((prev) => ({
        ...prev,
        [field]: "",
      }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const formattedError = result.error.flatten().fieldErrors;

      setError({
        email: formattedError.email?.[0],
        password: formattedError.password?.[0],
      });
      return;
    }

    setError({});

    console.log("로그인 요청", result.data);
  };

  const isValid = loginSchema.safeParse(formData).success;

  return (
    <div className="flex justify-center items-center top-1/2 translate-y-1/2">
      <div className="w-full max-w-[400px] h-auto p-6 flex flex-col gap-3 border rounded-2xl shadow justify-center items-center">
        <div className="text-xl font-bold text-center mb-2">로그인</div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-400 py-2 rounded mb-4 cursor-pointer"
        >
          <img src={googleIcon} alt="Google" className="w-5 h-5" />
          <p>구글 로그인</p>
        </button>

        <div className="w-full flex items-center my-2">
          <div className="flex-1 border-t border-gray-300" />
          <p className="px-2 text-gray-400 text-sm">OR</p>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div>
            <input
              type="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange("email")}
              className="w-full border p-2 rounded"
            />
            {error.email && (
              <p className="mt-1 text-sm text-red-500">{error.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange("password")}
              className="w-full border p-2 rounded"
            />
            {error.password && (
              <p className="mt-1 text-sm text-red-500">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full p-2 rounded text-white ${
              isValid ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
