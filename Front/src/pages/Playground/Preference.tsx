import { useMemo, useState } from "react";
import PreferenceHeader from "../../components/playground/preference/PreferenceHeader";
import PreferenceQuestion from "../../components/playground/preference/PreferenceQuestion";
import PreferenceOptionList from "../../components/playground/preference/PreferenceOptionList";
import PreferenceFooterNav from "../../components/playground/preference/PreferenceFooterNav";
import PreferenceResultView from "../../components/playground/preference/PreferenceResultView";
import { preferenceQuestions } from "../../data/preferenceQuestions";

type AnswerMap = Record<string, string>;

export default function Preference() {
  const total = preferenceQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = preferenceQuestions[currentIndex];

  const selectedValue = useMemo(() => {
    if (!currentQuestion) return "";
    return answers[currentQuestion.questionKey] ?? "";
  }, [answers, currentQuestion]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = Boolean(selectedValue);

  const handleSelect = (value: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.questionKey]: value,
    }));
  };

  const handlePrev = () => {
    if (!canGoPrev) return;
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!canGoNext) return;

    const isLast = currentIndex >= total - 1;
    if (isLast) {
      setIsFinished(true);
      return;
    }
    setCurrentIndex((prev) => Math.min(total - 1, prev + 1));
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <PreferenceResultView
        answers={answers}
        onRestart={handleRestart}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <>
      <PreferenceHeader
        currentIndex={currentIndex}
        total={total}
        category={currentQuestion.category}
      />

      <PreferenceQuestion
        title={currentQuestion.title}
      />

      <PreferenceOptionList
        options={currentQuestion.options}
        selectedValue={selectedValue}
        onSelect={handleSelect}
      />

      <PreferenceFooterNav
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onPrev={handlePrev}
        onNext={handleNext}
        nextLabel={currentIndex === total - 1 ? "결과 보기" : "다음 질문으로"}
      />
    </>
  );
}
