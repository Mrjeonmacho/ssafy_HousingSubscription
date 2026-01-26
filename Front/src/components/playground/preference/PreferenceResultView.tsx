type PreferenceResultViewProps = {
  answers?: Record<string, string>;
  onRestart?: () => void;
};

export default function PreferenceResultView({
  answers,
  onRestart,
}: PreferenceResultViewProps) {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-extrabold text-gray-900">
        주거 성향 테스트 결과
      </h1>

      <p className="mt-4 text-gray-600">
        결과 화면은 추후 구현 예정입니다.
      </p>

      {/* 임시 디버그용 */}
      {answers && (
        <pre className="mt-8 text-left text-xs bg-gray-100 p-4 rounded-xl overflow-auto">
          {JSON.stringify(answers, null, 2)}
        </pre>
      )}

      {onRestart && (
        <button
          type="button"
          onClick={onRestart}
          className="mt-10 px-6 py-3 rounded-full bg-primary text-gray-900 font-semibold hover:brightness-95"
        >
          다시 테스트하기
        </button>
      )}
    </section>
  );
}
