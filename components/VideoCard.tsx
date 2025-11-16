
import React from 'react';
import type { VideoResource } from '../types';

interface VideoCardProps {
    video: VideoResource;
}

const YoutubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-red-500">
      <path d="M2.5 17a2.4 2.4 0 0 1 3-2.5 2.4 2.4 0 0 1 3 2.5" /><path d="M15 14.5a2.4 2.4 0 0 1 3-2.5 2.4 2.4 0 0 1 3 2.5" /><path d="M21.5 14.5c0-1.6-1.5-4-3.5-4-2 0-3.5 2.4-3.5 4" /><path d="M2.5 17c0-1.6 1.5-4 3.5-4 2 0 3.5 2.4 3.5 4" /><path d="M8 17a5 5 0 0 0 8 0" /><circle cx="12" cy="12" r="10" />
    </svg>
)

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    return (
        <a 
            href={video.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-3 p-3 bg-slate-100 dark:bg-slate-900/50 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors group"
        >
            <div className="flex-shrink-0">
                <YoutubeIcon />
            </div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight">
                {video.title}
            </p>
        </a>
    )
}
