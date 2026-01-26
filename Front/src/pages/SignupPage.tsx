import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    password2: "",
    name: "",
    email: "",
    verificationCode: "", // 인증번호
  });

  const [emailStatus, setEmailStatus] = useState({
    sent: false,      // 인증번호 전송 여부
    verified: false,  // 인증 완료 여부
    timeLeft: 180,    // 타이머 (3분)
  });

  // 약관 동의
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });

  // 비밀번호 일치 여부
  const isPasswordMismatch = formData.password2.length > 0 && formData.password !== formData.password2;
  const isPasswordMatch = formData.password2.length > 0 && formData.password === formData.password2;

  const isAllAgreed = agreements.terms && agreements.privacy;

  // 타이머
  useEffect(() => {
    let timer: number;
    if (emailStatus.sent && !emailStatus.verified && emailStatus.timeLeft > 0) {
      timer = setInterval(() => {
        setEmailStatus((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [emailStatus.sent, emailStatus.verified, emailStatus.timeLeft]);

  // 초->분
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 이메일 인증번호 전송
  const handleSendVerification = () => {
    if (!formData.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    alert(`인증번호가 ${formData.email}로 전송되었습니다.`);
    setEmailStatus({ sent: true, verified: false, timeLeft: 180 });
  };

  // 이메일 인증번호 확인
  const handleVerifyCode = () => {
    if (formData.verificationCode === "123456") { // 테스트용 인증번호
      alert("이메일 인증이 완료되었습니다.");
      setEmailStatus((prev) => ({ ...prev, verified: true }));
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  // 약관 전체 동의
  const toggleAll = () => {
    const newValue = !isAllAgreed;
    setAgreements({ terms: newValue, privacy: newValue });
  };

  // 개별 약관 동의
  const toggleAgreement = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center my-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#111814] mb-2">
            서울집사에 오신 것을 환영합니다
          </h2>
          <p className="text-gray-500 font-medium">
            청년과 신혼부부를 위한 서울시 주거 지원 플랫폼
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">아이디</label>
            <div className="flex gap-3">
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="flex-1 px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="아이디를 입력해주세요"
              />
              <button
                type="button"
                className="px-5 py-3.5 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors whitespace-nowrap text-sm"
              >
                중복 확인
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="비밀번호를 입력해주세요"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">비밀번호 확인</label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 rounded-2xl border ${
                isPasswordMismatch
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200" // 불일치
                  : isPasswordMatch
                  ? "border-green-500 focus:border-green-500 focus:ring-green-200" // 일치
                  : "border-gray-200 focus:border-primary focus:ring-primary/20" // 기본
              } outline-none transition-all`}
              placeholder="비밀번호를 다시 입력해주세요"
            />
            {isPasswordMismatch && (
              <p className="text-red-500 text-sm mt-2 ml-1 font-medium animate-fade-in-down">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
            {isPasswordMatch && (
              <p className="text-green-500 text-sm mt-2 ml-1 font-medium animate-fade-in-down">
                비밀번호가 일치합니다.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="이름을 입력해주세요"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">이메일</label>
            <div className="flex gap-3 mb-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={emailStatus.verified} 
                className={`flex-1 px-4 py-3.5 rounded-2xl border ${emailStatus.verified ? 'bg-gray-50 text-gray-500 border-gray-200' : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'} outline-none transition-all`}
                placeholder="example@email.com"
              />
              <button
                type="button"
                onClick={handleSendVerification}
                disabled={emailStatus.verified}
                className={`px-5 py-3.5 font-bold rounded-2xl transition-colors whitespace-nowrap text-sm ${
                  emailStatus.verified 
                    ? "bg-green-100 text-green-600 cursor-default" // 인증 완료 상태
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200" // 전송 or 재전송 상태
                }`}
              >
                {emailStatus.verified ? "인증 완료" : emailStatus.sent ? "재전송" : "인증번호 전송"}
              </button>
            </div>

            {/* 인증번호 입력 필드 */}
            {emailStatus.sent && !emailStatus.verified && (
              <div className="flex gap-3 animate-fade-in-down">
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="인증번호 6자리"
                    maxLength={6}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-red-500">
                    {formatTime(emailStatus.timeLeft)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className="px-5 py-3.5 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors whitespace-nowrap text-sm"
                >
                  확인
                </button>
              </div>
            )}
          </div>

          {/* 약관 동의 */}
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 mt-8">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-4 cursor-pointer" onClick={toggleAll}>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${isAllAgreed ? 'bg-primary border-primary' : 'bg-white border-gray-300'}`}>
                {isAllAgreed && <span className="material-symbols-outlined text-white text-sm font-bold">check</span>}
              </div>
              <span className="font-bold text-gray-800">전체 동의</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleAgreement('terms')}>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${agreements.terms ? 'bg-gray-400 border-gray-400' : 'bg-white border-gray-300'}`}>
                    {agreements.terms && <span className="material-symbols-outlined text-white text-[10px] font-bold">check</span>}
                  </div>
                  <span className="text-sm text-gray-600">이용약관 동의 (필수)</span>
                </div>
                <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
              </div>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleAgreement('privacy')}>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${agreements.privacy ? 'bg-gray-400 border-gray-400' : 'bg-white border-gray-300'}`}>
                    {agreements.privacy && <span className="material-symbols-outlined text-white text-[10px] font-bold">check</span>}
                  </div>
                  <span className="text-sm text-gray-600">개인정보 수집 동의 (필수)</span>
                </div>
                <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-primary text-white font-bold text-lg h-14 rounded-2xl hover:brightness-105 shadow-lg shadow-primary/30 transition-all active:scale-[0.98]"
          >
            회원가입 완료
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="text-gray-500 hover:text-primary transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}