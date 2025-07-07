import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentHistory = ({ payments }) => {
  const [filter, setFilter] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-700';
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'failed':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-text-tertiary text-text-primary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const filteredPayments = payments.filter(payment => 
    filter === 'all' || payment.status === filter
  );

  return (
    <div className="bg-surface border border-border rounded-xl shadow-elevation-2">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="font-heading font-semibold text-text-primary text-lg">Payment History</h3>
            <p className="text-text-secondary text-sm">Track your earnings and payouts</p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-text-primary bg-surface focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Payments</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <Button variant="outline" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {filteredPayments.map((payment) => (
          <div key={payment.id} className="p-6 hover:bg-surface-secondary transition-colors duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name="DollarSign" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{payment.description}</p>
                  <p className="text-text-secondary text-sm">{payment.date}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold text-text-primary">${payment.amount.toLocaleString()}</p>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getStatusIcon(payment.status)} 
                      size={14} 
                      className={payment.status === 'completed' ? 'text-success' : 
                                payment.status === 'pending' ? 'text-warning' : 'text-error'} 
                    />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <Button variant="ghost" className="p-2">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            </div>
            
            {payment.course && (
              <div className="mt-3 ml-16">
                <p className="text-text-secondary text-sm">Course: {payment.course}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="CreditCard" size={48} className="mx-auto text-text-tertiary mb-4" />
          <p className="text-text-secondary">No payments found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;