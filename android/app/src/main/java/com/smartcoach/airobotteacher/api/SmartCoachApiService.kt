package com.smartcoach.airobotteacher.api

import com.smartcoach.airobotteacher.model.Question
import com.smartcoach.airobotteacher.model.Answer
import com.smartcoach.airobotteacher.model.Lesson
import com.smartcoach.airobotteacher.model.Quiz
import retrofit2.http.*

interface SmartCoachApiService {

    @GET("api/questions/{subject}")
    suspend fun getQuestions(@Path("subject") subject: String): List<Question>

    @POST("api/answer/evaluate")
    suspend fun evaluateAnswer(@Body answer: Answer): EvaluationResult

    @GET("api/lessons/{subject}/{level}")
    suspend fun getLessons(
        @Path("subject") subject: String,
        @Path("level") level: String
    ): List<Lesson>

    @GET("api/quiz/{subject}")
    suspend fun getQuiz(@Path("subject") subject: String): Quiz

    @POST("api/progress/{studentId}")
    suspend fun submitProgress(
        @Path("studentId") studentId: String,
        @Body progress: ProgressData
    ): ProgressResponse

    @GET("api/recommendations/{studentId}")
    suspend fun getRecommendations(@Path("studentId") studentId: String): RecommendationResponse

    data class EvaluationResult(
        val score: Int,
        val passed: Boolean,
        val feedback: String
    )

    data class ProgressData(
        val subject: String,
        val score: Int,
        val timestamp: Long
    )

    data class ProgressResponse(
        val studentId: String,
        val totalScore: Int,
        val lessonsCompleted: Int
    )

    data class RecommendationResponse(
        val studentId: String,
        val recommendedTopic: String,
        val difficulty: String
    )
}
