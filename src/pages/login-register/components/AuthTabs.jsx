import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex bg-surface-secondary rounded-lg p-1 mb-6">
      <Button
        variant={activeTab === 'login' ? 'primary' : 'ghost'}
        onClick={() => onTabChange('login')}
        className="flex-1 py-2 text-sm font-medium"
      >
        Sign In
      </Button>
      <Button
        variant={activeTab === 'register' ? 'primary' : 'ghost'}
        onClick={() => onTabChange('register')}
        className="flex-1 py-2 text-sm font-medium"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthTabs;