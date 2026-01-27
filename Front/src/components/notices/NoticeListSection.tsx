// Front/src/components/notices/NoticeListSection.tsx
import type { Notice } from "../../pages/NoticesPage";

type Props = {
  totalCount: number;
  items: Notice[];
  loading: boolean;
  errorMessage: string | null;
};

export default function NoticeListSection({
  totalCount,
  items,
  loading,
  errorMessage,
}: Props) {
  void totalCount;
  void items;
  void loading;
  void errorMessage;
  return null;
}
