import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ 
  videoUrl = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
  onTimeUpdate,
  onProgress,
  onEnded
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
  const [isBuffering, setIsBuffering] = useState(false);
  const [quality, setQuality] = useState('auto');
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const speedMenuRef = useRef(null);
  const volumeRef = useRef(null);
  const qualityMenuRef = useRef(null);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const qualityOptions = ['auto', '1080p', '720p', '480p', '360p'];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onTimeUpdate) {
        onTimeUpdate(video.currentTime);
      }
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const progress = (bufferedEnd / video.duration) * 100;
        if (onProgress) {
          onProgress(progress);
        }
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) {
        onEnded();
      }
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handleCanPlay = () => {
      setIsBuffering(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [onTimeUpdate, onProgress, onEnded]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(event.target)) {
        setShowSpeedMenu(false);
      }
      if (volumeRef.current && !volumeRef.current.contains(event.target)) {
        setShowVolumeSlider(false);
      }
      if (qualityMenuRef.current && !qualityMenuRef.current.contains(event.target)) {
        setShowQualityMenu(false);
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

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('keydown', handleKeyPress);
      }
      clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, currentTime]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.max(0, Math.min(time, duration));
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    handleSeek(newTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleSpeedChange = (speed) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black group"
      tabIndex={0}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src={videoUrl}
        onClick={togglePlayPause}
      />

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {/* Play/Pause Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`transition-opacity duration-300 ${showControls ? 'opacity-0' : 'opacity-100'}`}>
          <Button
            variant="ghost"
            onClick={togglePlayPause}
            className="text-white bg-black/50 hover:bg-black/70 p-4 rounded-full pointer-events-auto"
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={32} />
          </Button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${
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
            {/* Quality Selection */}
            <div className="relative" ref={qualityMenuRef}>
              <Button
                variant="ghost"
                onClick={() => setShowQualityMenu(!showQualityMenu)}
                className="text-white hover:bg-white/20 px-3 py-2 text-sm"
              >
                {quality}
              </Button>
              {showQualityMenu && (
                <div className="absolute bottom-12 right-0 bg-black/90 rounded-lg border border-white/20 py-2 min-w-20">
                  {qualityOptions.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setQuality(q);
                        setShowQualityMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-white hover:bg-white/20 text-sm ${
                        quality === q ? 'bg-white/20' : ''
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
    </div>
  );
};

export default VideoPlayer;