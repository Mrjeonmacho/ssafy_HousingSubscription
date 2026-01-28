import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import type { UserAddInfo } from "../types/user";

// 기본 정보 폼 타입 정의
interface BasicFormState {
  userName: string;
  loginId: string;
  email: string;
}

export default function MyPage() {
  const { user, logout } = useAuth();
  
  const [isBasicEditing, setIsBasicEditing] = useState(false);

  // 초기값 설정 (더미 데이터 사용)
  const [basicFormData, setBasicFormData] = useState<BasicFormState>({
    userName: user?.userName || "김서울",
    loginId: "seoul_dummy_01",
    email: "dummy@example.com"
  });

  useEffect(() => {
    if (user?.userName && basicFormData.userName !== user.userName) {
      setBasicFormData(prev => ({
        ...prev,
        userName: user.userName
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); 


  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!basicFormData.userName || !basicFormData.email) {
      alert("이름과 이메일은 필수입니다.");
      return;
    }
    alert("기본 정보가 수정되었습니다! (화면상 반영)");
    setIsBasicEditing(false);
  };

  // State 관리
  const [isAddInfoEditing, setIsAddInfoEditing] = useState(false);
  
  const [addInfoFormData, setAddInfoFormData] = useState<UserAddInfo>({
    birthDate: "1996-05-20",
    targetType: "YOUTH",
    marriageStatus: "SINGLE",
    childCount: 0,
    isHomeless: true,
    asset: "5000",
    income: "300",
  });

  const handleAddInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setAddInfoFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === "childCount") {
      setAddInfoFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setAddInfoFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addInfoFormData.birthDate || !addInfoFormData.asset || !addInfoFormData.income) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    alert("추가 정보가 수정되었습니다! (화면상 반영)");
    setIsAddInfoEditing(false);
  };

  const getDisplayValue = (key: string, value: string | number | boolean) => {
    if (key === "targetType") return value === "YOUTH" ? "청년" : "신혼부부";
    if (key === "marriageStatus") {
      if (value === "SINGLE") return "미혼";
      if (value === "MARRIED") return "기혼";
      return "결혼 예정";
    }
    if (key === "isHomeless") return value ? "무주택 (해당)" : "유주택 (해당 없음)";
    return value;
  };

  return (
    <div className="min-h-screen bg-white p-8 flex justify-center">
      <div className="max-w-6xl w-full flex gap-8">
        
        {/* 왼쪽 사이드바 */}
        <div className="w-64 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-xl mb-6 text-gray-900">마이페이지</h2>
            <nav className="space-y-2">
              <button className="w-full text-left px-4 py-3 bg-green-50 text-primary font-bold rounded-xl">
                👤 내 정보 관리
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                ❤️ 찜한 공고
              </button>
            </nav>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button onClick={logout} className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined text-sm">logout</span>
                로그아웃
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 메인 콘텐츠 */}
        <div className="flex-1 space-y-6">
          
          {/* 상단 프로필 카드 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {basicFormData.userName}님
              </h1>
              <p className="text-gray-500">Seoul Jibsa Housing Support Member</p>
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">기본 정보</h2>
              {!isBasicEditing && (
                <button 
                  onClick={() => setIsBasicEditing(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  수정하기
                </button>
              )}
            </div>

            {isBasicEditing ? (
              // 수정 모드
              <form onSubmit={handleBasicSubmit} className="grid grid-cols-2 gap-6 animate-fade-in-down">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">이름</label>
                  <input
                    type="text"
                    name="userName"
                    value={basicFormData.userName}
                    onChange={handleBasicChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 !bg-white !text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">아이디</label>
                  <input
                    type="text"
                    name="loginId"
                    value={basicFormData.loginId}
                    disabled 
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 !bg-gray-100 !text-gray-500 cursor-not-allowed outline-none"
                  />
                  <p className="text-xs text-gray-400 mt-1 ml-1">* 아이디는 변경할 수 없습니다.</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">이메일</label>
                  <input
                    type="email"
                    name="email"
                    value={basicFormData.email}
                    onChange={handleBasicChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 !bg-white !text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                
                <div className="col-span-2 flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsBasicEditing(false)}
                    className="flex-1 py-3.5 rounded-2xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] py-3.5 rounded-2xl font-bold text-white bg-primary hover:brightness-105 shadow-lg shadow-primary/30 transition-all"
                  >
                    저장하기
                  </button>
                </div>
              </form>
            ) : (
              // 보기 모드
              <div className="grid grid-cols-2 gap-8 animate-fade-in-up">
                <div>
                  <p className="text-sm text-gray-400 mb-1">이름</p>
                  <p className="font-bold text-lg text-gray-900">{basicFormData.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">아이디</p>
                  <p className="font-bold text-lg text-gray-900">{basicFormData.loginId}</p> 
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">이메일</p>
                  <p className="font-bold text-lg text-gray-900">{basicFormData.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* 추가 정보 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                <span className="material-symbols-outlined text-primary">edit_document</span>
                추가 정보
              </h2>
              
              {!isAddInfoEditing && (
                <button 
                  onClick={() => setIsAddInfoEditing(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  수정하기
                </button>
              )}
            </div>

            {isAddInfoEditing ? (
              <form onSubmit={handleAddInfoSubmit} className="grid grid-cols-2 gap-6 animate-fade-in-down">
                <div className="col-span-2 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-2">
                  <p className="text-sm text-gray-500">
                    * 이 정보는 현재 <strong>임시 데이터</strong>이며, 수정 후 저장 버튼을 누르면 화면에 반영됩니다.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">생년월일</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={addInfoFormData.birthDate}
                    onChange={handleAddInfoChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 !bg-white !text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">대상 유형</label>
                  <select
                    name="targetType"
                    value={addInfoFormData.targetType}
                    onChange={handleAddInfoChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 !bg-white !text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                  >
                    <option value="YOUTH">청년 (YOUTH)</option>
                    <option value="NEWLYWED">신혼부부 (NEWLYWED)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">혼인 상태</label>
                  <select
                    name="marriageStatus"
                    value={addInfoFormData.marriageStatus}
                    onChange={handleAddInfoChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 !bg-white !text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="SINGLE">미혼 (SINGLE)</option>
                    <option value="MARRIED">기혼 (MARRIED)</option>
                    <option value="PLANNED">결혼 예정 (PLANNED)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">자녀 수</label>
                  <input
                    type="number"
                    name="childCount"
                    value={addInfoFormData.childCount}
                    onChange={handleAddInfoChange}
                    min="0"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 !bg-white !text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">총 자산 (만원)</label>
                  <input
                    type="text"
                    name="asset"
                    value={addInfoFormData.asset}
                    onChange={handleAddInfoChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 !bg-white !text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">월 소득 (만원)</label>
                  <input
                    type="text"
                    name="income"
                    value={addInfoFormData.income}
                    onChange={handleAddInfoChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 !bg-white !text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none placeholder:text-gray-400"
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      name="isHomeless"
                      checked={addInfoFormData.isHomeless}
                      onChange={handleAddInfoChange}
                      className="w-5 h-5 accent-primary"
                    />
                    <span className="font-bold text-gray-700">현재 무주택자입니다 (세대원 포함)</span>
                  </label>
                </div>
                <div className="col-span-2 flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddInfoEditing(false)}
                    className="flex-1 py-3.5 rounded-2xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-2 py-3.5 rounded-2xl font-bold text-white bg-primary hover:brightness-105 shadow-lg shadow-primary/30 transition-all"
                  >
                    저장하기
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-8 animate-fade-in-up">
                <div>
                  <p className="text-sm text-gray-400 mb-1">생년월일</p>
                  <p className="font-bold text-lg text-gray-900">{addInfoFormData.birthDate || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">대상 유형</p>
                  <p className="font-bold text-lg text-gray-900">{getDisplayValue("targetType", addInfoFormData.targetType)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">혼인 상태</p>
                  <p className="font-bold text-lg text-gray-900">{getDisplayValue("marriageStatus", addInfoFormData.marriageStatus)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">자녀 수</p>
                  <p className="font-bold text-lg text-gray-900">{addInfoFormData.childCount}명</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">총 자산</p>
                  <p className="font-bold text-lg text-gray-900">{addInfoFormData.asset ? `${addInfoFormData.asset}만원` : "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">월 소득</p>
                  <p className="font-bold text-lg text-gray-900">{addInfoFormData.income ? `${addInfoFormData.income}만원` : "-"}</p>
                </div>
                <div className="col-span-2 p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-600 shadow-sm">
                    <span className="material-symbols-outlined">home</span>
                  </div>
                  <div>
                    <p className="text-xs text-green-600 font-bold mb-0.5">주거 상태</p>
                    <p className="text-green-800 font-bold">{getDisplayValue("isHomeless", addInfoFormData.isHomeless)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}