import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import InstructorVerification from './components/InstructorVerification';
import LanguageSelector from './components/LanguageSelector';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showInstructorVerification, setShowInstructorVerification] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [registrationData, setRegistrationData] = useState(null);
  const navigate = useNavigate();

  // Mock credentials for testing
  const mockCredentials = {
    student: {
      email: 'student@edumarket.com',
      password: 'student123'
    },
    instructor: {
      email: 'instructor@edumarket.com',
      password: 'instructor123'
    }
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      const isStudentValid = formData.email === mockCredentials.student.email && 
                            formData.password === mockCredentials.student.password;
      const isInstructorValid = formData.email === mockCredentials.instructor.email && 
                               formData.password === mockCredentials.instructor.password;
      
      if (isStudentValid) {
        // Store user data
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('userName', 'John Doe');
        localStorage.setItem('userEmail', formData.email);
        navigate('/student-dashboard');
      } else if (isInstructorValid) {
        // Store user data
        localStorage.setItem('userRole', 'instructor');
        localStorage.setItem('userName', 'Sarah Wilson');
        localStorage.setItem('userEmail', formData.email);
        navigate('/instructor-dashboard');
      } else {
        alert(`Invalid credentials. Use:\nStudent: ${mockCredentials.student.email} / ${mockCredentials.student.password}\nInstructor: ${mockCredentials.instructor.email} / ${mockCredentials.instructor.password}`);
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setRegistrationData(formData);
      
      if (formData.userType === 'instructor') {
        setShowInstructorVerification(true);
      } else {
        // Complete student registration
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('userName', formData.name);
        localStorage.setItem('userEmail', formData.email);
        navigate('/student-dashboard');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstructorVerification = async (verificationData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Complete instructor registration
      localStorage.setItem('userRole', 'instructor');
      localStorage.setItem('userName', registrationData.name);
      localStorage.setItem('userEmail', registrationData.email);
      navigate('/instructor-dashboard');
    } catch (error) {
      alert('Profile completion failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipVerification = () => {
    // Complete instructor registration without verification
    localStorage.setItem('userRole', 'instructor');
    localStorage.setItem('userName', registrationData.name);
    localStorage.setItem('userEmail', registrationData.email);
    navigate('/instructor-dashboard');
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful social login as student
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('userName', `${provider} User`);
      localStorage.setItem('userEmail', `user@${provider}.com`);
      navigate('/student-dashboard');
    } catch (error) {
      alert(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToAuth = () => {
    setShowInstructorVerification(false);
    setRegistrationData(null);
    setActiveTab('register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface to-secondary-50">
      {/* Simplified Header */}
      <header className="bg-surface/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <div>
                <span className="text-xl font-heading font-semibold text-primary">EduMarket</span>
                <span className="text-xl font-heading font-medium text-text-primary ml-1">Pro</span>
              </div>
            </div>

            {/* Language Selector */}
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          {showInstructorVerification ? (
            /* Instructor Verification Step */
            <div className="bg-surface rounded-2xl shadow-elevation-4 p-6 sm:p-8">
              <button
                onClick={handleBackToAuth}
                className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-150 mb-6"
              >
                <Icon name="ArrowLeft" size={16} />
                <span className="text-sm">Back to registration</span>
              </button>
              
              <InstructorVerification
                onSubmit={handleInstructorVerification}
                onSkip={handleSkipVerification}
                isLoading={isLoading}
              />
            </div>
          ) : (
            /* Main Authentication Form */
            <div className="bg-surface rounded-2xl shadow-elevation-4 p-6 sm:p-8">
              {/* Welcome Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="BookOpen" size={32} color="white" />
                </div>
                <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  {activeTab === 'login' ? 'Welcome Back!' : 'Join EduMarket Pro'}
                </h1>
                <p className="text-text-secondary">
                  {activeTab === 'login' ?'Sign in to continue your learning journey' :'Start your journey as a learner or instructor'
                  }
                </p>
              </div>

              {/* Auth Tabs */}
              <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {/* Auth Forms */}
              {activeTab === 'login' ? (
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
              ) : (
                <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
              )}

              {/* Social Login */}
              <div className="mt-6">
                <SocialLogin 
                  isLoading={isLoading}
                  onSocialLogin={handleSocialLogin}
                />
              </div>

              {/* Footer Links */}
              <div className="mt-8 text-center">
                <p className="text-sm text-text-secondary">
                  {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                    className="text-primary hover:text-primary-700 font-medium transition-colors duration-150"
                    disabled={isLoading}
                  >
                    {activeTab === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Trust Signals */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-text-tertiary">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={16} />
                <span className="text-xs">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span className="text-xs">10k+ Students</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Award" size={16} />
                <span className="text-xs">Verified Instructors</span>
              </div>
            </div>
          </div>

          {/* Mock Credentials Info */}
          <div className="mt-6 bg-primary-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary mb-2">Demo Credentials</p>
                <div className="text-xs text-text-secondary space-y-1">
                  <p><strong>Student:</strong> {mockCredentials.student.email} / {mockCredentials.student.password}</p>
                  <p><strong>Instructor:</strong> {mockCredentials.instructor.email} / {mockCredentials.instructor.password}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginRegister;