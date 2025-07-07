import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StudentTable = ({ students, onMessage, onViewProgress }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('enrolledDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'enrolledDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === sortedStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(sortedStudents.map(s => s.id));
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-surface border border-border rounded-xl shadow-elevation-2">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="font-heading font-semibold text-text-primary text-lg">Student Enrollments</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
              <Input
                type="search"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            {selectedStudents.length > 0 && (
              <Button variant="primary" iconName="MessageCircle">
                Message Selected ({selectedStudents.length})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-secondary">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedStudents.length === sortedStudents.length && sortedStudents.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-4 text-left text-text-secondary font-medium text-sm">Student</th>
              <th 
                className="px-6 py-4 text-left text-text-secondary font-medium text-sm cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('course')}
              >
                <div className="flex items-center space-x-1">
                  <span>Course</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-text-secondary font-medium text-sm cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('progress')}
              >
                <div className="flex items-center space-x-1">
                  <span>Progress</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-text-secondary font-medium text-sm cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('enrolledDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Enrolled</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-text-secondary font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedStudents.map((student) => (
              <tr key={student.id} className="hover:bg-surface-secondary transition-colors duration-150">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image 
                        src={student.avatar} 
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{student.name}</p>
                      <p className="text-text-secondary text-sm">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-text-primary font-medium">{student.course}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-surface-tertiary rounded-full h-2 max-w-24">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(student.progress)}`}
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-text-secondary text-sm font-medium">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-text-secondary text-sm">{student.enrolledDate}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => onMessage(student.id)}
                      className="p-2"
                      title="Send Message"
                    >
                      <Icon name="MessageCircle" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => onViewProgress(student.id)}
                      className="p-2"
                      title="View Progress"
                    >
                      <Icon name="BarChart3" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedStudents.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="mx-auto text-text-tertiary mb-4" />
          <p className="text-text-secondary">No students found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default StudentTable;