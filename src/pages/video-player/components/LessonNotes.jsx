import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const LessonNotes = ({ 
  currentTime = 0,
  onAddNote,
  isVisible = false,
  onToggleVisibility
}) => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      timestamp: 125,
      content: "Important concept: React Hooks can only be called at the top level of React functions",
      createdAt: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      timestamp: 245,
      content: "Remember to use dependency array in useEffect to prevent infinite loops",
      createdAt: new Date(Date.now() - 1800000)
    },
    {
      id: 3,
      timestamp: 380,
      content: "Custom hooks should start with \'use\' prefix by convention",
      createdAt: new Date(Date.now() - 900000)
    }
  ]);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const textareaRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        timestamp: Math.floor(currentTime),
        content: newNote.trim(),
        createdAt: new Date()
      };
      
      setNotes(prev => [...prev, note].sort((a, b) => a.timestamp - b.timestamp));
      setNewNote('');
      setIsAddingNote(false);
      
      if (onAddNote) {
        onAddNote(note);
      }
    }
  };

  const handleDeleteNote = (noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const handleNoteClick = (timestamp) => {
    // This would typically seek to the timestamp in the video
    console.log(`Seeking to ${timestamp} seconds`);
  };

  const startAddingNote = () => {
    setIsAddingNote(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-20 right-4 z-40 lg:hidden">
        <Button
          variant="primary"
          onClick={onToggleVisibility}
          className="p-3 shadow-elevation-4"
        >
          <Icon name="FileText" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-80 bg-surface border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-text-primary">My Notes</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="primary"
              onClick={startAddingNote}
              className="p-2"
              iconName="Plus"
            />
            <Button
              variant="ghost"
              onClick={onToggleVisibility}
              className="p-2 lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          {notes.length} notes • Click timestamps to jump to that moment
        </p>
      </div>

      {/* Add Note Form */}
      {isAddingNote && (
        <div className="p-4 border-b border-border bg-surface-secondary">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Clock" size={16} />
              <span>At {formatTime(currentTime)}</span>
            </div>
            <textarea
              ref={textareaRef}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add your note here..."
              className="w-full p-3 border border-border rounded-lg resize-none focus:border-primary focus:ring-1 focus:ring-primary"
              rows={3}
            />
            <div className="flex items-center space-x-2">
              <Button
                variant="primary"
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="flex-1"
              >
                Save Note
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="FileText" size={48} className="text-text-tertiary mb-4" />
            <h4 className="font-medium text-text-primary mb-2">No notes yet</h4>
            <p className="text-text-secondary text-sm mb-4">
              Start taking notes to remember important moments in this lesson
            </p>
            <Button
              variant="primary"
              onClick={startAddingNote}
              iconName="Plus"
              iconPosition="left"
            >
              Add First Note
            </Button>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-surface-secondary rounded-lg p-4 hover:bg-surface-tertiary transition-colors duration-150 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <button
                    onClick={() => handleNoteClick(note.timestamp)}
                    className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-colors duration-150"
                  >
                    <Icon name="Play" size={14} />
                    <span className="font-mono text-sm font-medium">
                      {formatTime(note.timestamp)}
                    </span>
                  </button>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1 text-error hover:bg-error-50"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
                <p className="text-text-primary text-sm leading-relaxed mb-2">
                  {note.content}
                </p>
                <p className="text-text-tertiary text-xs">
                  {formatDate(note.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-surface-secondary">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            iconName="Download"
            iconPosition="left"
          >
            Export Notes
          </Button>
          <Button
            variant="text"
            className="w-full text-primary"
            iconName="Share"
            iconPosition="left"
          >
            Share Notes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonNotes;