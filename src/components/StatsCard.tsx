import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: number;
    label: string;
  };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-xl lg:text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-2 lg:p-3 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
        </div>
      </div>
      {trend && (
        <div className="mt-3">
          <span className={`text-xs lg:text-sm ${trend.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs lg:text-sm text-gray-500 ml-2">{trend.label}</span>
        </div>
      )}
    </div>
  );
}