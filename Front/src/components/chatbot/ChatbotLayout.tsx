import { Outlet } from "react-router-dom";
import Header from "../layout/Header";

export default function ChatbotLayout() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* 기존 공통 헤더 */}
      <Header />

      {/* 챗봇 전용 영역 */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}