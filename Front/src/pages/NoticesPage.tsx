// Front/src/pages/NoticesPage.tsx
import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";

import NoticeHeroCarousel from "../components/notices/NoticeHeroCarousel";
import BookmarkedNoticeSection from "../components/notices/FavoritesNoticeSection";
import NoticeFilterBar from "../components/notices/NoticeFilterBar";
import NoticeListSection from "../components/notices/NoticeListSection";
import Pagination from "../components/notices/Pagination";

// ✅ 백엔드 enum 기준
type NoticeCategory =
  | "YOUTH_RESIDENCE"
  | "HAPPY_HOUSE"
  | "NATIONAL_RENTAL"
  | "PUBLIC_RENTAL"
  | "LONG_TERM_RENTAL"
  | "SALE_HOUSE"
  | string;

type NoticeStatus =
  | "RECEIVING"
  | "DEADLINE_APPROACHING"
  | "COMPLETED"
  | "TO_BE_ANNOUNCED"
  | string;

export type Notice = {
  id: number;
  noticeNo: string | null;
  title: string;
  category: NoticeCategory | null;
  regDate: string | null;
  status: NoticeStatus | null;
  startDate: string | null;
  endDate: string | null;
  pdfUrl: string | null;
  url: string | null;
};

// ✅ /api/notices 응답 형태: { notices: [...] }
type NoticesResponse = {
  notices: Notice[];
};

type ApiErrorResponse = {
  code?: string;
  message?: string;
};

type SortKey = "LATEST" | "DEADLINE" | "POPULAR";

type Filters = {
  keyword: string;
  category: string; // "ALL" | NoticeCategory
  status: string; // "ALL" | NoticeStatus
  sort: SortKey;
};

const DEFAULT_FILTERS: Filters = {
  keyword: "",
  category: "ALL",
  status: "ALL",
  sort: "LATEST",
};

export default function NoticesPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const [notices, setNotices] = useState<Notice[]>([]);
  const [favorites, setFavorites] = useState<Notice[]>([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setErrorMessage(null);

      try {
        const noticesRes = await axios.get<NoticesResponse>("/api/notices", {
          params: { sort: filters.sort },
          signal: controller.signal,
        });

        // console.log("sample notice:", noticesRes.data?.notices?.[0]);

        setNotices(noticesRes.data?.notices ?? []);
        setFavorites([]); // 임시
      } catch (err) {
        const ax = err as AxiosError<ApiErrorResponse>;
        const msg =
          ax.response?.data?.message ||
          ax.message ||
          "목록을 불러오지 못했습니다.";
        setErrorMessage(msg);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [filters.sort]);

  // 필터 변경 시 1페이지로
  useEffect(() => {
    setPage(1);
  }, [filters.keyword, filters.category, filters.status, filters.sort]);

  // FE 임시 필터링
  const filtered = useMemo(() => {
    const keyword = filters.keyword.trim().toLowerCase();

    return (notices ?? []).filter((n) => {
      const matchKeyword =
        keyword.length === 0 || (n.title ?? "").toLowerCase().includes(keyword);

      const matchCategory =
        filters.category === "ALL" || n.category === filters.category;

      const matchStatus =
        filters.status === "ALL" || n.status === filters.status;

      return matchKeyword && matchCategory && matchStatus;
    });
  }, [notices, filters.keyword, filters.category, filters.status]);

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Hero: 접수중(RECEIVING) 우선 + 최대 3개
  const featured = useMemo(() => {
    const list = [...(notices ?? [])].sort((a, b) => {
      const aRec = a.status === "RECEIVING" ? 0 : 1;
      const bRec = b.status === "RECEIVING" ? 0 : 1;
      return aRec - bRec;
    });
    return list.slice(0, 3);
  }, [notices]);

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-8 space-y-10">
      <NoticeHeroCarousel items={featured} />

      <BookmarkedNoticeSection items={favorites} />

      <NoticeFilterBar value={filters} onChange={setFilters} />

      <NoticeListSection
        totalCount={totalCount}
        items={paged}
        loading={loading}
        errorMessage={errorMessage}
      />

      <Pagination page={page} totalPages={totalPages} onChangePage={setPage} />
    </div>
  );
}
