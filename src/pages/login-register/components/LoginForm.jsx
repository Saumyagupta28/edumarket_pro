import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your email');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Enter your password"
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
        {errors.password && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4"
            disabled={isLoading}
          />
          <span className="text-sm text-text-secondary">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary-700 transition-colors duration-150"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full py-3"
        disabled={isLoading}
        loading={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;