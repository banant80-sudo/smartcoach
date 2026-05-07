package com.smartcoach.airobotteacher.model

import com.google.gson.annotations.SerializedName

data class ChatMessage(
    @SerializedName("id")
    val id: String,
    @SerializedName("text")
    val text: String,
    @SerializedName("is_user")
    val isUser: Boolean,
    @SerializedName("timestamp")
    val timestamp: Long
)

data class Question(
    @SerializedName("id")
    val id: String,
    @SerializedName("question_text")
    val questionText: String,
    @SerializedName("subject")
    val subject: String,
    @SerializedName("level")
    val level: String,
    @SerializedName("options")
    val options: List<String>? = null,
    @SerializedName("correct_answer")
    val correctAnswer: String
)

data class Lesson(
    @SerializedName("id")
    val id: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("content")
    val content: String,
    @SerializedName("subject")
    val subject: String,
    @SerializedName("level")
    val level: String,
    @SerializedName("exercises")
    val exercises: List<String>,
    @SerializedName("duration_minutes")
    val durationMinutes: Int
)

data class Quiz(
    @SerializedName("id")
    val id: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("subject")
    val subject: String,
    @SerializedName("questions")
    val questions: List<Question>,
    @SerializedName("time_limit")
    val timeLimit: Int
)

data class StudentProfile(
    @SerializedName("id")
    val id: String,
    @SerializedName("name")
    val name: String,
    @SerializedName("email")
    val email: String,
    @SerializedName("current_level")
    val currentLevel: String,
    @SerializedName("subjects")
    val subjects: List<String>,
    @SerializedName("total_score")
    val totalScore: Int,
    @SerializedName("lessons_completed")
    val lessonsCompleted: Int,
    @SerializedName("learning_progress")
    val learningProgress: Double
)

data class QuizResult(
    @SerializedName("quiz_id")
    val quizId: String,
    @SerializedName("student_id")
    val studentId: String,
    @SerializedName("score")
    val score: Int,
    @SerializedName("total_questions")
    val totalQuestions: Int,
    @SerializedName("correct_answers")
    val correctAnswers: Int,
    @SerializedName("timestamp")
    val timestamp: Long
)
