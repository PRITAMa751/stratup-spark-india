
import React, { useState } from 'react';
import { indianLanguages, investmentLevels } from '../constants';

interface IdeaFormProps {
  onGenerate: (interests: string, investment: string, location: string) => void;
  isLoading: boolean;
}

const ButtonSpinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);


export const IdeaForm: React.FC<IdeaFormProps> = ({ onGenerate, isLoading }) => {
  const [interests, setInterests] = useState('');
  const [investment, setInvestment] = useState('Low');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (interests && location) {
      onGenerate(interests, investment, location);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Your Interests or Skills
          </label>
          <input
            type="text"
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., sustainable farming, coding, baking"
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="investment" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Investment Level
          </label>
          <select
            id="investment"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {investmentLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Target City or Region in India
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Bangalore, Rural Punjab, Mumbai"
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !interests || !location}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {isLoading ? <ButtonSpinner/> : null}
          {isLoading ? 'Generating...' : 'Spark Ideas'}
        </button>
      </form>
    </div>
  );
};
