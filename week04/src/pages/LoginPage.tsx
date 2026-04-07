import googleIcon from "../assets/googleIcon.svg";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center top-1/2 translate-y-1/2">
      <div className="w-[400px] h-auto p-6 flex flex-col gap-3 border rounded-2xl shadow justify-center items-center">
        <div className="text-xl font-bold text-center mb-2">로그인</div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-400 py-2 rounded mb-4 cursor-pointer"
        >
          <img src={googleIcon} alt="Google" className="w-5 h-5" />
          <p>구글 로그인</p>
        </button>

        <div className="flex items-center my-2">
          <div className="flex-grow border-gray-300" />
          <p className="px-2 text-gray-400 text-sm">OR</p>
          <div className="flex-grow border-gray-300" />
        </div>

        <input placeholder="이메일" className="w-full border p-2 rounded" />
        <input placeholder="비밀번호" className="w-full border p-2 rounded" />

        <button className="w-full bg-blue-600 text-white border p-2 rounded">
          로그인
        </button>
      </div>
    </div>
  );
}
