import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-error';
    if (passwordStrength <= 3) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full ${errors.name ? 'border-error' : ''}`}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full ${errors.email ? 'border-error' : ''}`}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pr-10 ${errors.password ? 'border-error' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
        
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-1 bg-surface-tertiary rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${
                passwordStrength <= 2 ? 'text-error' : 
                passwordStrength <= 3 ? 'text-warning' : 'text-success'
              }`}>
                {getPasswordStrengthText()}
              </span>
            </div>
          </div>
        )}
        
        {errors.password && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full pr-10 ${errors.confirmPassword ? 'border-error' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
            disabled={isLoading}
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          I want to join as:
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            formData.userType === 'student' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-dark'
          }`}>
            <Input
              type="radio"
              name="userType"
              value="student"
              checked={formData.userType === 'student'}
              onChange={handleInputChange}
              className="sr-only"
              disabled={isLoading}
            />
            <div className="text-center">
              <Icon name="GraduationCap" size={20} className="mx-auto mb-1" />
              <span className="text-sm font-medium">Student</span>
            </div>
          </label>
          
          <label className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            formData.userType === 'instructor' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-dark'
          }`}>
            <Input
              type="radio"
              name="userType"
              value="instructor"
              checked={formData.userType === 'instructor'}
              onChange={handleInputChange}
              className="sr-only"
              disabled={isLoading}
            />
            <div className="text-center">
              <Icon name="Users" size={20} className="mx-auto mb-1" />
              <span className="text-sm font-medium">Instructor</span>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label className="flex items-start space-x-3 cursor-pointer">
          <Input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className={`w-4 h-4 mt-0.5 ${errors.acceptTerms ? 'border-error' : ''}`}
            disabled={isLoading}
          />
          <span className="text-sm text-text-secondary">
            I agree to the{' '}
            <button type="button" className="text-primary hover:text-primary-700 underline">
              Terms of Service
            </button>
            {' '}and{' '}
            <button type="button" className="text-primary hover:text-primary-700 underline">
              Privacy Policy
            </button>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.acceptTerms}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full py-3"
        disabled={isLoading}
        loading={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;