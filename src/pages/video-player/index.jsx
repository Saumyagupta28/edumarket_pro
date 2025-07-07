import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import VideoPlayer from './components/VideoPlayer';
import VideoHeader from './components/VideoHeader';
import LessonPlaylist from './components/LessonPlaylist';
import LessonNotes from './components/LessonNotes';
import LessonInfo from './components/LessonInfo';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const VideoPlayerPage = () => {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(1);
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(true);
  const [isNotesVisible, setIsNotesVisible] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [isLessonBookmarked, setIsLessonBookmarked] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [activeView, setActiveView] = useState('video'); // 'video', 'info'

  // Mock course data
  const courseData = {
    title: "Advanced React Patterns",
    instructor: "Sarah Johnson",
    totalLessons: 12,
    progress: 45
  };

  const currentLessonData = {
    id: 1,
    title: "Introduction to React Hooks",
    description: `In this comprehensive lesson, we'll explore the fundamentals of React Hooks, a powerful feature introduced in React 16.8 that allows you to use state and other React features without writing a class component.We'll cover the motivation behind hooks, their benefits over class components, and dive deep into the most commonly used hooks like useState and useEffect.`,
    duration: "12:45",
    difficulty: "Beginner",
    tags: ["React", "Hooks", "JavaScript", "Frontend"],
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  };

  const instructorData = {
    name: "Sarah Johnson",
    title: "Senior React Developer",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Sarah is a senior frontend developer with 8+ years of experience building scalable React applications.",
    rating: 4.9,
    students: 12500,
    courses: 15
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch (e.key) {
        case 'Escape':
          if (isPictureInPicture) {
            setIsPictureInPicture(false);
          } else {
            navigate('/course-detail');
          }
          break;
        case 'p':
          setIsPlaylistVisible(!isPlaylistVisible);
          break;
        case 'n':
          setIsNotesVisible(!isNotesVisible);
          break;
        case 'i':
          setActiveView(activeView === 'video' ? 'info' : 'video');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [navigate, isPlaylistVisible, isNotesVisible, isPictureInPicture, activeView]);

  // Auto-hide controls after inactivity
  useEffect(() => {
    let timeout;
    const resetTimeout = () => {
      setShowVideoControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowVideoControls(false);
      }, 3000);
    };

    const handleMouseMove = () => resetTimeout();
    const handleMouseLeave = () => {
      clearTimeout(timeout);
      setShowVideoControls(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeout);
    };
  }, []);

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson.id);
    setCurrentTime(0);
    setLessonProgress(0);
    setIsLessonCompleted(lesson.completed || false);
    // In a real app, you would load the new lesson data here
  };

  const handleNextLesson = () => {
    if (currentLesson < courseData.totalLessons) {
      setCurrentLesson(currentLesson + 1);
      setCurrentTime(0);
      setLessonProgress(0);
      setIsLessonCompleted(false);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 1) {
      setCurrentLesson(currentLesson - 1);
      setCurrentTime(0);
      setLessonProgress(0);
      setIsLessonCompleted(false);
    }
  };

  const handleVideoTimeUpdate = (time) => {
    setCurrentTime(time);
    // Calculate lesson progress based on video duration
    const progress = (time / (12 * 60 + 45)) * 100; // Mock duration
    setLessonProgress(Math.min(progress, 100));
  };

  const handleVideoEnded = () => {
    setIsLessonCompleted(true);
    setLessonProgress(100);
  };

  const handleMarkComplete = (completed) => {
    setIsLessonCompleted(completed);
    if (completed) {
      setLessonProgress(100);
    }
  };

  const handleToggleBookmark = (bookmarked) => {
    setIsLessonBookmarked(bookmarked);
  };

  const handleExitCourse = () => {
    navigate('/course-detail');
  };

  const handleAddNote = (note) => {
    console.log('Note added:', note);
    // In a real app, you would save the note to the backend
  };

  const togglePictureInPicture = () => {
    setIsPictureInPicture(!isPictureInPicture);
  };

  // Mobile responsive layout
  const isMobile = window.innerWidth < 1024;

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header - Hidden in fullscreen mode */}
      {!isPictureInPicture && (
        <GlobalHeader 
          userRole="student" 
          userName="John Doe" 
          notificationCount={3} 
        />
      )}

      {/* Breadcrumb - Hidden in fullscreen mode */}
      {!isPictureInPicture && (
        <div className="pt-16 px-4 sm:px-6 lg:px-8">
          <BreadcrumbTrail 
            courseTitle={courseData.title}
            lessonTitle={currentLessonData.title}
          />
        </div>
      )}

      {/* Main Content */}
      <div className={`${!isPictureInPicture ? 'pt-4' : ''} flex flex-col lg:flex-row h-screen ${!isPictureInPicture ? 'lg:h-[calc(100vh-120px)]' : ''}`}>
        {/* Video Section */}
        <div className={`flex-1 relative ${isPictureInPicture ? 'fixed top-4 right-4 w-80 h-48 z-50 rounded-lg overflow-hidden shadow-elevation-5' : ''}`}>
          {/* Video Player Container */}
          <div className="relative w-full h-64 lg:h-full bg-black">
            {/* Video Header Overlay */}
            <VideoHeader
              courseTitle={courseData.title}
              lessonTitle={currentLessonData.title}
              currentLesson={currentLesson}
              totalLessons={courseData.totalLessons}
              progress={lessonProgress}
              onExitCourse={handleExitCourse}
              showControls={showVideoControls}
            />

            {/* Video Player */}
            <VideoPlayer
              videoUrl={currentLessonData.videoUrl}
              onTimeUpdate={handleVideoTimeUpdate}
              onProgress={setLessonProgress}
              onEnded={handleVideoEnded}
            />

            {/* Picture-in-Picture Toggle */}
            {!isMobile && (
              <div className="absolute top-4 right-4 z-40">
                <Button
                  variant="ghost"
                  onClick={togglePictureInPicture}
                  className={`text-white bg-black/50 hover:bg-black/70 p-2 transition-opacity duration-300 ${
                    showVideoControls ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Icon name={isPictureInPicture ? "Minimize2" : "PictureInPicture2"} size={20} />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile View Toggle */}
          {isMobile && !isPictureInPicture && (
            <div className="flex bg-surface border-t border-border">
              <button
                onClick={() => setActiveView('video')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-150 ${
                  activeView === 'video' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                Video
              </button>
              <button
                onClick={() => setActiveView('info')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-150 ${
                  activeView === 'info' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                Info
              </button>
            </div>
          )}
        </div>

        {/* Content Section */}
        {!isPictureInPicture && (
          <div className={`${isMobile && activeView === 'video' ? 'hidden' : 'flex'} flex-col lg:flex-row lg:w-2/3`}>
            {/* Lesson Info / Playlist */}
            <div className="flex-1 overflow-hidden">
              {isMobile ? (
                <LessonInfo
                  lesson={currentLessonData}
                  instructor={instructorData}
                  onMarkComplete={handleMarkComplete}
                  onToggleBookmark={handleToggleBookmark}
                  isCompleted={isLessonCompleted}
                  isBookmarked={isLessonBookmarked}
                />
              ) : (
                <div className="h-full flex flex-col">
                  {/* Desktop Tabs */}
                  <div className="flex border-b border-border bg-surface">
                    <button
                      onClick={() => setIsPlaylistVisible(true)}
                      className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        isPlaylistVisible
                          ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Icon name="List" size={16} />
                      <span>Playlist</span>
                    </button>
                    <button
                      onClick={() => setIsPlaylistVisible(false)}
                      className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        !isPlaylistVisible
                          ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Icon name="Info" size={16} />
                      <span>Lesson Info</span>
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-hidden">
                    {isPlaylistVisible ? (
                      <LessonPlaylist
                        currentLessonId={currentLesson}
                        onLessonSelect={handleLessonSelect}
                        isCollapsed={false}
                      />
                    ) : (
                      <div className="h-full overflow-y-auto">
                        <LessonInfo
                          lesson={currentLessonData}
                          instructor={instructorData}
                          onMarkComplete={handleMarkComplete}
                          onToggleBookmark={handleToggleBookmark}
                          isCompleted={isLessonCompleted}
                          isBookmarked={isLessonBookmarked}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Notes Panel - Desktop Only */}
            {!isMobile && (
              <LessonNotes
                currentTime={currentTime}
                onAddNote={handleAddNote}
                isVisible={isNotesVisible}
                onToggleVisibility={() => setIsNotesVisible(!isNotesVisible)}
              />
            )}
          </div>
        )}

        {/* Mobile Notes - Floating */}
        {isMobile && !isPictureInPicture && (
          <LessonNotes
            currentTime={currentTime}
            onAddNote={handleAddNote}
            isVisible={isNotesVisible}
            onToggleVisibility={() => setIsNotesVisible(!isNotesVisible)}
          />
        )}
      </div>

      {/* Navigation Controls - Mobile */}
      {isMobile && !isPictureInPicture && (
        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-40">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousLesson}
              disabled={currentLesson === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                Lesson {currentLesson} of {courseData.totalLessons}
              </p>
              <div className="w-32 h-1 bg-border rounded-full mx-auto mt-1">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${lessonProgress}%` }}
                />
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleNextLesson}
              disabled={currentLesson === courseData.totalLessons}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help - Hidden by default */}
      <div className="fixed bottom-4 left-4 z-30 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/80 text-white text-xs p-2 rounded-lg">
          <p>Press 'P' for playlist, 'N' for notes, 'I' for info</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;