package com.smartcoach.airobotteacher.network

import com.google.gson.annotations.SerializedName
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*

// API Models
data class QuestionRequest(
    @SerializedName("question")
    val question: String,
    @SerializedName("subject")
    val subject: String,
    @SerializedName("level")
    val level: String
)

data class QuestionResponse(
    @SerializedName("answer")
    val answer: String,
    @SerializedName("explanation")
    val explanation: String,
    @SerializedName("references")
    val references: List<String>
)

data class LessonRequest(
    @SerializedName("student_id")
    val studentId: String,
    @SerializedName("subject")
    val subject: String,
    @SerializedName("level")
    val level: String
)

data class LessonResponse(
    @SerializedName("lesson_id")
    val lessonId: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("content")
    val content: String,
    @SerializedName("exercises")
    val exercises: List<String>,
    @SerializedName("duration")
    val duration: Int
)

data class AnswerEvaluationRequest(
    @SerializedName("student_answer")
    val studentAnswer: String,
    @SerializedName("correct_answer")
    val correctAnswer: String,
    @SerializedName("question_id")
    val questionId: String
)

data class AnswerEvaluationResponse(
    @SerializedName("score")
    val score: Int,
    @SerializedName("passed")
    val passed: Boolean,
    @SerializedName("feedback")
    val feedback: String
)

data class ProgressResponse(
    @SerializedName("student_id")
    val studentId: String,
    @SerializedName("total_score")
    val totalScore: Int,
    @SerializedName("lessons_completed")
    val lessonsCompleted: Int,
    @SerializedName("quizzes_taken")
    val quizzesTaken: Int,
    @SerializedName("average_score")
    val averageScore: Double
)

// Retrofit API Service Interface
interface SmartCoachApiService {

    @POST("/api/question/answer")
    fun answerQuestion(
        @Body request: QuestionRequest
    ): Call<QuestionResponse>

    @POST("/api/lesson/create")
    fun createLesson(
        @Body request: LessonRequest
    ): Call<LessonResponse>

    @POST("/api/answer/evaluate")
    fun evaluateAnswer(
        @Body request: AnswerEvaluationRequest
    ): Call<AnswerEvaluationResponse>

    @GET("/api/progress/{studentId}")
    fun getProgress(
        @Path("studentId") studentId: String
    ): Call<ProgressResponse>

    @GET("/api/recommendation/{studentId}")
    fun getRecommendation(
        @Path("studentId") studentId: String
    ): Call<Map<String, String>>
}

// Retrofit Instance Builder
object RetrofitClient {
    private const val BASE_URL = "https://api.smartcoach.com/"

    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val apiService: SmartCoachApiService = retrofit.create(SmartCoachApiService::class.java)
}
