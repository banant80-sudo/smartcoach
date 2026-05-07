"""
Unit tests for SmartCoach AI Engine
"""

import unittest
import sys
sys.path.insert(0, '../')

from ai_engine.teacher_ai import SmartTeacher

class TestSmartTeacher(unittest.TestCase):
    
    def setUp(self):
        self.teacher = SmartTeacher()
    
    def test_teacher_initialization(self):
        """Test teacher initializes with knowledge base"""
        self.assertIsNotNone(self.teacher.knowledge_base)
        self.assertIn('mathematics', self.teacher.knowledge_base)
        self.assertIn('science', self.teacher.knowledge_base)
    
    def test_answer_question(self):
        """Test teacher can answer questions"""
        question = "What is algebra?"
        answer = self.teacher.answer_question(question, 'mathematics')
        self.assertIsNotNone(answer)
        self.assertTrue(len(answer) > 0)
    
    def test_evaluate_answer(self):
        """Test evaluation of student answers"""
        student_answer = "The capital of France is Paris"
        correct_answer = "The capital of France is Paris"
        
        result = self.teacher.evaluate_answer(student_answer, correct_answer)
        
        self.assertIn('score', result)
        self.assertIn('passed', result)
        self.assertIn('feedback', result)
        self.assertEqual(result['score'], 100)
        self.assertTrue(result['passed'])
    
    def test_personalized_lesson_creation(self):
        """Test creation of personalized lessons"""
        lesson = self.teacher.create_personalized_lesson(
            'student_1', 
            'mathematics', 
            'beginner'
        )
        
        self.assertEqual(lesson['student_id'], 'student_1')
        self.assertEqual(lesson['subject'], 'mathematics')
        self.assertEqual(lesson['level'], 'beginner')
        self.assertIn('exercises', lesson)
        self.assertTrue(len(lesson['exercises']) > 0)
    
    def test_progress_tracking(self):
        """Test student progress tracking"""
        profile = self.teacher.track_progress('student_1', 'quiz_score', 85)
        
        self.assertEqual(profile['quiz_scores'][0], 85)
        
        profile = self.teacher.track_progress('student_1', 'lesson_complete', None)
        self.assertEqual(profile['lessons_completed'], 1)
    
    def test_recommendation(self):
        """Test topic recommendation"""
        # Add some scores
        self.teacher.track_progress('student_1', 'quiz_score', 95)
        self.teacher.track_progress('student_1', 'quiz_score', 92)
        
        recommendation = self.teacher.recommend_next_topic('student_1')
        
        self.assertEqual(recommendation['student_id'], 'student_1')
        self.assertEqual(recommendation['recommended_difficulty'], 'advanced')

class TestSmartTeacherAdvanced(unittest.TestCase):
    
    def setUp(self):
        self.teacher = SmartTeacher()
    
    def test_multiple_students(self):
        """Test handling multiple students"""
        for i in range(3):
            self.teacher.track_progress(f'student_{i}', 'quiz_score', 70 + i*10)
        
        self.assertEqual(len(self.teacher.student_profiles), 3)
    
    def test_knowledge_base_completeness(self):
        """Test knowledge base has all subjects"""
        subjects = self.teacher.knowledge_base.keys()
        self.assertIn('mathematics', subjects)
        self.assertIn('science', subjects)
        self.assertIn('english', subjects)

if __name__ == '__main__':
    unittest.main()
