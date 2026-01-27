// Front/src/components/notices/NoticeListSection.tsx
import { useMemo, useState } from "react";
import type { Notice } from "../../pages/NoticesPage";
import { categoryLabel, statusLabel } from "../../utils/noticeFormat";

type SortType = "REG_DATE" | "END_DATE";

type Props = {
  totalCount: number;
  items: Notice[];
  loading: boolean;
  errorMessage: string | null;
};

function formatDateRange(start: string | null, end: string | null) {
  const s = start ?? "-";
  const e = end ?? "-";
  return `${s} - ${e}`;
}

function calcDDay(endDate: string | null) {
  if (!endDate) return null;
  const end = new Date(endDate);
  if (Number.isNaN(end.getTime())) return null;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  const diffMs = startOfEnd.getTime() - startOfToday.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `D-${diffDays}`;
  if (diffDays === 0) return "D-DAY";
  return null; // 지난 날짜는 D-day 표시 안 함
}

function rightTone() {
  return "text-[#4CAF50]";
}

function HeartIcon({ active }: { active: boolean }) {
  if (active) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 21s-7.2-4.7-9.6-9.2C.7 8.5 2.3 5.4 5.6 4.6c1.7-.4 3.5.2 4.7 1.5L12 7.9l1.7-1.8c1.2-1.3 3-1.9 4.7-1.5 3.3.8 4.9 3.9 3.2 7.2C19.2 16.3 12 21 12 21z"
          fill="#EF4444"
        />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12.1 20.3s-6.9-4.4-9.1-8.7C1.5 8.6 3 5.9 5.8 5.2c1.5-.4 3.1.2 4.2 1.4L12 8.3l2-1.7c1.1-1.2 2.7-1.8 4.2-1.4 2.8.7 4.3 3.4 2.8 6.4-2.2 4.3-8.9 8.7-8.9 8.7z"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SkeletonRow() {
  return (
    <div className="rounded-[20px] bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-6">
        <div className="h-24 w-32 rounded-2xl bg-gray-100 animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-7 w-3/4 rounded bg-gray-100 animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
            <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-6 w-12 rounded bg-gray-100 animate-pulse" />
          <div className="h-6 w-6 rounded bg-gray-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function isNew(regDate: string | null, days = 7) {
  if (!regDate) return false;

  const reg = new Date(regDate);
  if (Number.isNaN(reg.getTime())) return false;

  const now = new Date();
  const diffMs = now.getTime() - reg.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays <= days;
}

export default function NoticeListSection({
  totalCount,
  items,
  loading,
}: Props) {
  const [sortType, setSortType] = useState<SortType>("REG_DATE");
  const [open, setOpen] = useState(false);

  const sortedItems = useMemo(() => {
    const copied = [...items];

    return copied.sort((a, b) => {
      if (sortType === "REG_DATE") {
        return (
          new Date(b.regDate ?? "1970-01-01").getTime() -
          new Date(a.regDate ?? "1970-01-01").getTime()
        );
      }

      // 마감 임박순 (endDate 없으면 맨 뒤)
      return (
        new Date(a.endDate ?? "9999-12-31").getTime() -
        new Date(b.endDate ?? "9999-12-31").getTime()
      );
    });
  }, [items, sortType]);


  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between px-1">
        <h3 className="text-xl font-bold text-gray-900 leading-none">
          전체 공고 리스트 <span className="text-gray-900">({totalCount})</span>
        </h3>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="정렬"
          >
            {sortType === "REG_DATE" ? "최신 등록순" : "마감 임박순"}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-36 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-10">
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                onClick={() => {
                  setSortType("REG_DATE");
                  setOpen(false);
                }}
              >
                최신 등록순
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                onClick={() => {
                  setSortType("END_DATE");
                  setOpen(false);
                }}
              >
                마감 임박순
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : sortedItems.length === 0 ? (
          <div className="rounded-[20px] border border-gray-100 bg-white px-6 py-12 text-center text-gray-500 shadow-sm">
            표시할 공고가 없습니다.
          </div>
        ) : (
          sortedItems.map((n) => {
            const dday = calcDDay(n.endDate);
            const rightText = dday ?? statusLabel(n.status);

            const isFavorite = false;

            return (
              <article
                key={n.id}
                className="group relative flex flex-col md:flex-row items-stretch md:items-center gap-6 rounded-[20px] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#F2F4F6] hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className="shrink-0 w-full md:w-32 flex flex-col justify-center items-center rounded-full bg-[#F3F4F6] py-3 px-2 text-center">
                  <span className="text-xs text-[#7D8592] mb-1">주택유형</span>
                  <span className="text-[15px] font-bold text-[#191F28] break-keep leading-tight">
                    {categoryLabel(n.category)}
                  </span>
                </div>

                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="truncate text-lg md:text-[15px] font-bold text-[#191F28] tracking-tight">
                      {n.title}
                    </h4>
                    {isNew(n.regDate) && (
                      <span className="inline-flex shrink-0 items-center justify-center rounded bg-[#DDFBE2] px-[6px] py-[2px] text-[10px] font-bold text-[#2E7D32]">
                        NEW
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#8B95A1] font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[17px] text-[#9CA3AF]">
                        calendar_today
                      </span>
                      <span className="tracking-tight">
                        {formatDateRange(n.startDate, n.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[17px] text-[#9CA3AF]">
                        location_on
                      </span>
                      <span>서울특별시 전역</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 md:pl-2">
                  <div className={`text-l tracking-tight whitespace-nowrap ${rightTone()}`}>
                    {rightText}
                  </div>

                  <button
                    type="button"
                    className="p-1 rounded-full hover:bg-gray-50 transition-colors"
                    aria-label="관심 공고 등록"
                    onClick={() => {}}
                  >
                    <HeartIcon active={isFavorite} />
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
