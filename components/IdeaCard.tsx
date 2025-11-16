
import React, { useState } from 'react';
import type { BusinessIdea, VideoResource } from '../types';
import { indianLanguages } from '../constants';
import { findBusinessVideos } from '../services/geminiService';
import { VideoCard } from './VideoCard';
import { Loader } from './Loader';

interface IdeaCardProps {
  idea: BusinessIdea;
}

const Tag: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <span className={`inline-block bg-opacity-20 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full ${className}`}>
        {children}
    </span>
);

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
    const [videos, setVideos] = useState<VideoResource[]>([]);
    const [isLoadingVideos, setIsLoadingVideos] = useState<boolean>(false);
    const [videoError, setVideoError] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('Hindi');
    const [showVideoFinder, setShowVideoFinder] = useState<boolean>(false);

    const handleFetchVideos = async () => {
        setIsLoadingVideos(true);
        setVideoError(null);
        setVideos([]);
        try {
            const fetchedVideos = await findBusinessVideos(idea.name, selectedLanguage);
            setVideos(fetchedVideos);
        } catch (err) {
            setVideoError('Could not fetch videos. Please try again.');
            console.error(err);
        } finally {
            setIsLoadingVideos(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{idea.name}</h3>
                <div className="mb-4">
                    <Tag className="bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      💰 {idea.estimatedInvestment}
                    </Tag>
                    <Tag className="bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300">
                      🛠️ {idea.skillLevel}
                    </Tag>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {idea.description}
                </p>
            </div>
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800">
                { showVideoFinder ? (
                    <div className="space-y-4">
                         <div className="flex flex-col sm:flex-row gap-2">
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                {indianLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                            </select>
                            <button onClick={handleFetchVideos} disabled={isLoadingVideos} className="w-full sm:w-auto flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                                {isLoadingVideos ? 'Searching...' : 'Find'}
                            </button>
                         </div>
                         {isLoadingVideos && <Loader message="Finding videos..." small />}
                         {videoError && <p className="text-xs text-red-500">{videoError}</p>}
                         {videos.length > 0 && (
                            <div className="space-y-3 pt-2">
                                {videos.map((video, index) => <VideoCard key={index} video={video} />)}
                            </div>
                         )}
                    </div>
                ) : (
                    <button
                        onClick={() => setShowVideoFinder(true)}
                        className="w-full text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                       Find Learning Resources →
                    </button>
                )}
            </div>
        </div>
    );
};
