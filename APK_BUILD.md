# SmartCoach APK Build Instructions

## Prerequisites
- Android Studio 2023.1 or higher
- JDK 11 or higher
- Android SDK 24+ (API Level 24)
- Gradle 8.0+

## Build Steps

### 1. Setup
```bash
# Clone the repository
git clone https://github.com/banant80-sudo/smartcoach.git
cd smartcoach/android

# Open in Android Studio
```

### 2. Configure Backend
Edit `gradle.properties` or `local.properties`:
```properties
api.base_url=https://your-backend-server.com/api/
```

### 3. Build Debug APK
```bash
./gradlew assembleDebug
# Output: app/build/outputs/apk/debug/app-debug.apk
```

### 4. Build Release APK
```bash
./gradlew assembleRelease
# Output: app/build/outputs/apk/release/app-release.apk
```

### 5. Install APK on Device/Emulator
```bash
# Debug
adb install app/build/outputs/apk/debug/app-debug.apk

# Release
adb install app/build/outputs/apk/release/app-release.apk
```

## APK Download

### Option A: Direct Build
1. Open project in Android Studio
2. Go to Build → Build Bundle(s)/APK(s) → Build APK(s)
3. APK will be generated in `app/build/outputs/apk/`

### Option B: Command Line
```bash
chmod +x gradlew
./gradlew clean assembleDebug
```

### Option C: CI/CD Pipeline
GitHub Actions workflow automatically builds APK on every release.

## APK Info
- **App Name**: SmartCoach - AI Robot Teacher
- **Package**: com.smartcoach.airobotteacher
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14)
- **Current Version**: 1.0.0

## Features in APK
✅ AI-Powered Teaching
✅ Real-time Chat with Teacher
✅ Interactive Lessons
✅ Quizzes & Assessments
✅ Progress Tracking
✅ Personalized Recommendations
✅ Offline Support (cached content)
✅ Multi-Subject Support

## Installation Requirements
- Android 7.0 or higher
- Internet connection
- 50MB free storage

## Support
For issues or questions, contact: support@smartcoach.com
