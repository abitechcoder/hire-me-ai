import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
    text?: string;
    className?: string;
}

export default function Loading({ text = "Loading data...", className = "" }: LoadingProps) {
    return (
        <div className={`flex flex-col items-center justify-center min-h-[75vh] w-full ${className}`}>
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
            <p className="text-gray-500 text-sm font-medium animate-pulse">{text}</p>
        </div>
    );
}
