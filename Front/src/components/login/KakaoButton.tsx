import React from 'react';

interface KakaoButtonProps {
  onClick: () => void;
}

const KakaoButton = ({ onClick }: KakaoButtonProps): React.ReactElement => {
  return (
    <button
      className="flex items-center justify-center bg-yellow-400 rounded-lg h-12 px-4 shadow-sm hover:bg-yellow-500 active:bg-yellow-600 transition duration-200"
      onClick={onClick}
    >
      <img
        src="/assets/icons/kakao-login.png" 
        alt="카카오 로그인"
        className="h-full"
      />
    </button>
  );
};

export default KakaoButton;