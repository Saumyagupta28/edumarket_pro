import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const VideoPlayerControls = ({ 
  courseTitle = "Advanced React Patterns",
  lessonTitle = "Introduction to Hooks",
  currentLesson = 1,
  totalLessons = 12,
  progress = 45,
  onProgressUpdate,
  onNextLesson,
  onPreviousLesson,
  onExitCourse
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const navigate = useNavigate();
  const controlsTimeoutRef = useRef(null);
  const speedMenuRef = useRef(null);
  const volumeRef = useRef(null);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(event.target)) {
        setShowSpeedMenu(false);
      }
      if (volumeRef.current && !volumeRef.current.contains(event.target)) {
        setShowVolumeSlider(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const handleKeyPress = (e) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          handleSeek(currentTime - 10);
          break;
        case 'ArrowRight':
          handleSeek(currentTime + 10);
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'm':
          toggleMute();
          break;
        default:
          break;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyPress);
      clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, currentTime]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time) => {
    const newTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(newTime);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    handleSeek(newTime);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleExitCourse = () => {
    if (onExitCourse) {
      onExitCourse();
    } else {
      navigate('/course-detail');
    }
  };

  const handleNextLesson = () => {
    if (onNextLesson) {
      onNextLesson();
    }
  };

  const handlePreviousLesson = () => {
    if (onPreviousLesson) {
      onPreviousLesson();
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* Minimal Header */}
      <div className={`absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleExitCourse}
              className="text-white hover:bg-white/20 p-2"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="text-white">
              <h1 className="font-heading font-medium text-lg">{courseTitle}</h1>
              <p className="text-white/80 text-sm">{lessonTitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <span>{currentLesson} of {totalLessons}</span>
            <div className="w-24 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Content Area */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="text-white/50 text-center">
          <Icon name="Play" size={64} className="mx-auto mb-4" />
          <p>Video Player Component</p>
          <p className="text-sm mt-2">Click controls to interact</p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Progress Bar */}
        <div className="px-4 pb-2">
          <div 
            className="w-full h-1 bg-white/30 rounded-full cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-accent rounded-full transition-all duration-150 group-hover:h-1.5"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              onClick={togglePlayPause}
              className="text-white hover:bg-white/20 p-2"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
            </Button>

            {/* Previous/Next Lesson */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={handlePreviousLesson}
                disabled={currentLesson === 1}
                className="text-white hover:bg-white/20 p-2 disabled:opacity-50"
              >
                <Icon name="SkipBack" size={20} />
              </Button>
              <Button
                variant="ghost"
                onClick={handleNextLesson}
                disabled={currentLesson === totalLessons}
                className="text-white hover:bg-white/20 p-2 disabled:opacity-50"
              >
                <Icon name="SkipForward" size={20} />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2" ref={volumeRef}>
              <Button
                variant="ghost"
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="text-white hover:bg-white/20 p-2"
              >
                <Icon name={isMuted || volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} size={20} />
              </Button>
              {showVolumeSlider && (
                <div className="bg-black/80 rounded-lg p-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 accent-accent"
                  />
                </div>
              )}
            </div>

            {/* Time Display */}
            <div className="text-white text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Playback Speed */}
            <div className="relative" ref={speedMenuRef}>
              <Button
                variant="ghost"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="text-white hover:bg-white/20 px-3 py-2 text-sm font-mono"
              >
                {playbackSpeed}x
              </Button>
              {showSpeedMenu && (
                <div className="absolute bottom-12 right-0 bg-black/90 rounded-lg border border-white/20 py-2 min-w-20">
                  {speedOptions.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`w-full px-4 py-2 text-left text-white hover:bg-white/20 text-sm font-mono ${
                        playbackSpeed === speed ? 'bg-white/20' : ''
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 p-2"
            >
              <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Lesson Navigation Overlay */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40">
        <div className={`bg-black/80 rounded-lg p-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-white text-center mb-3">
            <p className="text-xs text-white/80">Lesson</p>
            <p className="font-mono font-medium">{currentLesson}/{totalLessons}</p>
          </div>
          <div className="space-y-2">
            <Button
              variant="ghost"
              onClick={handlePreviousLesson}
              disabled={currentLesson === 1}
              className="w-full text-white hover:bg-white/20 p-2 disabled:opacity-50"
            >
              <Icon name="ChevronUp" size={16} />
            </Button>
            <Button
              variant="ghost"
              onClick={handleNextLesson}
              disabled={currentLesson === totalLessons}
              className="w-full text-white hover:bg-white/20 p-2 disabled:opacity-50"
            >
              <Icon name="ChevronDown" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerControls;