import React from 'react';

interface KakaoButtonProps {
  onClick: () => void;
}

const KakaoButton = ({ onClick }: KakaoButtonProps): React.ReactElement => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#fdd835] text-black/85 rounded-xl h-12 px-4 shadow-sm active:scale-[0.98] transition-all"
    >
      <svg
        viewBox="-2 -2 28 28"
        fill="currentColor"
        className="w-5 h-5 text-black" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 3C5.373 3 0 7.358 0 12.75c0 3.326 2.067 6.273 5.3 8.086-.144.53-.947 3.354-1.085 3.868-.17.63.236.62.496.446 2.766-1.85 5.586-3.766 6.55-4.298.57.067 1.15.103 1.74.103 6.626 0 12-4.358 12-9.75S18.626 3 12 3z" />
      </svg>
      
      <span className="text-sm font-semibold">카카오 로그인</span>
    </button>
  );
};

export default KakaoButton;