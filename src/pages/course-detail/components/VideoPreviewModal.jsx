import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPreviewModal = ({ isOpen, onClose, course, lesson }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes preview
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    let interval;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    setCurrentTime(newTime);
  };

  const handleEnrollNow = () => {
    onClose();
    // Trigger enrollment process
  };

  const handleFullCourse = () => {
    onClose();
    navigate('/video-player');
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-black rounded-xl overflow-hidden shadow-elevation-6">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between p-4">
            <div className="text-white">
              <h2 className="font-heading font-semibold text-lg">
                {lesson?.title || 'Course Preview'}
              </h2>
              <p className="text-white/80 text-sm">{course?.title}</p>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2"
            >
              <Icon name="X" size={24} />
            </Button>
          </div>
        </div>

        {/* Video Area */}
        <div className="relative aspect-video bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                <Icon name={isPlaying ? "Pause" : "Play"} size={32} />
              </div>
              <p className="text-lg font-medium mb-2">Preview Mode</p>
              <p className="text-white/80 text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>
          </div>

          {/* Play/Pause Overlay */}
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors duration-200"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <Icon name={isPlaying ? "Pause" : "Play"} size={24} color="white" />
            </div>
          </button>

          {/* Preview Watermark */}
          <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            Preview
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent">
          {/* Progress Bar */}
          <div className="px-4 pb-2">
            <div 
              className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-primary rounded-full transition-all duration-150"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between px-4 pb-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handlePlayPause}
                className="text-white hover:bg-white/20 p-2"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
              </Button>
              <div className="text-white text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            <div className="text-white text-sm">
              Preview • Limited to {formatTime(duration)}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-surface border-t border-border p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="text-center sm:text-left">
              <h3 className="font-heading font-semibold text-text-primary mb-1">
                Ready to start learning?
              </h3>
              <p className="text-text-secondary text-sm">
                Get full access to all {course?.lessonCount} lessons and course materials
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleFullCourse}>
                Continue Watching
              </Button>
              <Button variant="primary" onClick={handleEnrollNow} className="px-6">
                Enroll Now - ${course?.price}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreviewModal;