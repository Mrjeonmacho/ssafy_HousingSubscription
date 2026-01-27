import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../components/login/GoogleButton";
import KakaoButton from "../components/login/KakaoButton";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId || !formData.password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    // Todo: 로그인 API 호출
    console.log("로그인 시도:", formData);
    alert(`${formData.userId}님, 환영합니다!`);
    navigate("/");
  };

  const handleSocialLogin = (provider: string) => {
    // Todo: 소셜 로그인 처리
    alert(`${provider} 로그인을 시도합니다.`);
  };

  return (
    <div className="bg-white flex flex-col items-center my-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-lg border border-gray-100 p-8 md:p-10 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-primary mb-4">
            <span className="material-symbols-outlined text-3xl">storefront</span>
          </div>
          <h2 className="text-2xl font-bold text-[#111814] mb-1">
            서울집사 로그인
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            청년과 신혼부부를 위한 맞춤형 주거지원 서비스
          </p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-bold text-gray-800 ml-1">아이디</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[22px]">person</span>
              </div>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-300"
                placeholder="아이디를 입력해주세요"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-bold text-gray-800 ml-1">비밀번호</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[22px]">lock</span>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-300"
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold text-lg h-14 rounded-2xl hover:brightness-105 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-2"
          >
            로그인
          </button>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 font-medium pt-2">
            <button type="button" className="hover:text-primary transition-colors">
              아이디 찾기
            </button>
            <div className="w-px h-3 bg-gray-300"></div>
            <button type="button" className="hover:text-primary transition-colors">
              비밀번호 찾기
            </button>
          </div>
        </form>

        {/* 소셜 로그인 */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs text-gray-400 bg-white px-2">
            또는
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <KakaoButton onClick={() => handleSocialLogin("Kakao")} />
          <GoogleButton onClick={() => handleSocialLogin("Google")} />
        </div>

        {/* 회원가입 링크 */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            아직 회원이 아니신가요?{" "}
            <Link to="/signup" className="text-primary font-bold hover:underline ml-1">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}