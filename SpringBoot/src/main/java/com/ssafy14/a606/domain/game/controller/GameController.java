package com.ssafy14.a606.domain.game.controller;

import com.ssafy14.a606.domain.game.dto.request.PreferenceResultRequest;
import com.ssafy14.a606.domain.game.dto.request.QuizAnswerRequest;
import com.ssafy14.a606.domain.game.dto.response.PreferenceResultResponse;
import com.ssafy14.a606.domain.game.dto.response.QuizAnswerResponse;
import com.ssafy14.a606.domain.game.dto.response.QuizQuestionResponse;
import com.ssafy14.a606.domain.game.service.PreferenceService;
import com.ssafy14.a606.domain.game.service.QuizService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    private final QuizService quizService;
    private final PreferenceService preferenceService;

    public GameController(QuizService quizService, PreferenceService preferenceService) {
        this.quizService = quizService;
        this.preferenceService = preferenceService;
    }
    /**
     * 용어 퀴즈 시작 -> 랜덤 10문제 제공
     */
    @GetMapping("/quiz/start")
    public ResponseEntity<List<QuizQuestionResponse>> startQuiz() {
        return ResponseEntity.ok(quizService.getRandomQuizQuestions());
    }

    /**
     * 용어 퀴즈 정답 제출
     */
    @PostMapping("/quiz/answer")
    public ResponseEntity<QuizAnswerResponse> submitAnswer(@RequestBody QuizAnswerRequest request) {
        return ResponseEntity.ok(quizService.submitAnswer(request));
    }

    /**
     * 주거 선호도 결과 도출
     */
    @PostMapping("/preferences/result")
    public ResponseEntity<PreferenceResultResponse> getPreferenceResult(@RequestBody PreferenceResultRequest request) {
        return ResponseEntity.ok(preferenceService.calculatePreferenceType(request));
    }


}
