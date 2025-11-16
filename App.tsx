
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { IdeaForm } from './components/IdeaForm';
import { IdeaCard } from './components/IdeaCard';
import { Loader } from './components/Loader';
import { generateBusinessIdeas } from './services/geminiService';
import type { BusinessIdea } from './types';

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleGenerateIdeas = async (interests: string, investment: string, location: string) => {
    setIsLoading(true);
    setError(null);
    setIdeas([]);
    try {
      const newIdeas = await generateBusinessIdeas(interests, investment, location);
      setIdeas(newIdeas);
    } catch (err) {
      setError('Failed to generate ideas. The model may be busy. Please try again in a moment.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredIdeas = useMemo(() => {
    if (!searchTerm) return ideas;
    return ideas.filter(idea =>
      idea.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [ideas, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Find Your Next Big Idea
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            AI-powered business discovery for India's aspiring entrepreneurs. Enter your interests, budget, and location to get started.
          </p>
        </div>

        <IdeaForm onGenerate={handleGenerateIdeas} isLoading={isLoading} />

        {isLoading && <Loader message="Generating business ideas, please wait..." />}

        {error && (
          <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg text-center">
            <p><strong>Oops!</strong> {error}</p>
          </div>
        )}
        
        {ideas.length > 0 && (
          <div className="mt-12">
            <div className="max-w-lg mx-auto mb-8">
               <input
                  type="text"
                  placeholder="Search generated ideas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredIdeas.map((idea, index) => (
                <IdeaCard key={index} idea={idea} />
              ))}
            </div>
            {filteredIdeas.length === 0 && searchTerm && (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <p>No ideas match your search term "{searchTerm}".</p>
              </div>
            )}
          </div>
        )}
      </main>
      <footer className="text-center py-6 mt-12 border-t border-slate-200 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} Startup Spark India. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
