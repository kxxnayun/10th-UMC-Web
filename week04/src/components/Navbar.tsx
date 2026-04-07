import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="relative sticky bg-white fixed top-0 left-0 w-full h-[60px] p-5 shadow-md z-50">
      <div className="flex flex-row justify-center w-full gap-5 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "text-blue-600 font-bold" : "text-black"}`
          }
        >
          홈
        </NavLink>

        <NavLink
          to="/popular"
          className={({ isActive }) =>
            `${isActive ? "text-blue-600 font-bold" : "text-black"}`
          }
        >
          인기 영화
        </NavLink>

        <NavLink
          to="/now-playing"
          className={({ isActive }) =>
            `${isActive ? "text-blue-600 font-bold" : "text-black"}`
          }
        >
          상영 중
        </NavLink>

        <NavLink
          to="/top-rated"
          className={({ isActive }) =>
            `${isActive ? "text-blue-600 font-bold" : "text-black"}`
          }
        >
          평점 높은
        </NavLink>

        <NavLink
          to="/upcoming"
          className={({ isActive }) =>
            `${isActive ? "text-blue-600 font-bold" : "text-black"}`
          }
        >
          개봉 예정
        </NavLink>
      </div>
      <div className="absolute right-5 top-1/2 -translate-y-1/2">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `${isActive ? "text-blue-600 font-bold" : "text-black"}`
          }
        >
          로그인
        </NavLink>
      </div>
    </div>
  );
}
