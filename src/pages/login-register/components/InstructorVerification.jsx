import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InstructorVerification = ({ onSubmit, onSkip, isLoading }) => {
  const [formData, setFormData] = useState({
    bio: '',
    expertise: '',
    credentials: '',
    experience: '',
    linkedinUrl: '',
    websiteUrl: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.bio.trim()) {
      newErrors.bio = 'Professional bio is required';
    } else if (formData.bio.trim().length < 50) {
      newErrors.bio = 'Bio must be at least 50 characters long';
    }
    
    if (!formData.expertise.trim()) {
      newErrors.expertise = 'Area of expertise is required';
    }
    
    if (formData.linkedinUrl && !/^https?:\/\/(www\.)?linkedin\.com\//.test(formData.linkedinUrl)) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }
    
    if (formData.websiteUrl && !/^https?:\/\//.test(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid website URL';
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
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Award" size={32} color="white" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Complete Your Instructor Profile
        </h3>
        <p className="text-text-secondary text-sm">
          Help students learn more about your expertise and background
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Professional Bio *
          </label>
          <textarea
            name="bio"
            placeholder="Tell students about your background, experience, and teaching philosophy..."
            value={formData.bio}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none ${
              errors.bio ? 'border-error' : 'border-border'
            }`}
            disabled={isLoading}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.bio ? (
              <p className="text-error text-sm flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.bio}
              </p>
            ) : (
              <p className="text-text-tertiary text-xs">
                {formData.bio.length}/500 characters
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Area of Expertise *
          </label>
          <Input
            type="text"
            name="expertise"
            placeholder="e.g., Web Development, Data Science, Digital Marketing"
            value={formData.expertise}
            onChange={handleInputChange}
            className={`w-full ${errors.expertise ? 'border-error' : ''}`}
            disabled={isLoading}
          />
          {errors.expertise && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.expertise}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Credentials & Certifications
          </label>
          <Input
            type="text"
            name="credentials"
            placeholder="e.g., PhD Computer Science, AWS Certified, Google Analytics Certified"
            value={formData.credentials}
            onChange={handleInputChange}
            className="w-full"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Years of Experience
          </label>
          <Input
            type="text"
            name="experience"
            placeholder="e.g., 5+ years in software development"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full"
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              LinkedIn Profile
            </label>
            <Input
              type="url"
              name="linkedinUrl"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedinUrl}
              onChange={handleInputChange}
              className={`w-full ${errors.linkedinUrl ? 'border-error' : ''}`}
              disabled={isLoading}
            />
            {errors.linkedinUrl && (
              <p className="text-error text-sm mt-1 flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.linkedinUrl}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Personal Website
            </label>
            <Input
              type="url"
              name="websiteUrl"
              placeholder="https://yourwebsite.com"
              value={formData.websiteUrl}
              onChange={handleInputChange}
              className={`w-full ${errors.websiteUrl ? 'border-error' : ''}`}
              disabled={isLoading}
            />
            {errors.websiteUrl && (
              <p className="text-error text-sm mt-1 flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.websiteUrl}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            className="flex-1 py-3"
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Saving Profile...' : 'Complete Profile'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onSkip}
            className="flex-1 py-3"
            disabled={isLoading}
          >
            Skip for Now
          </Button>
        </div>
      </form>

      <div className="bg-primary-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary mb-1">Why complete your profile?</p>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Build trust with potential students</li>
              <li>• Increase course enrollment rates</li>
              <li>• Get featured in instructor spotlights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorVerification;