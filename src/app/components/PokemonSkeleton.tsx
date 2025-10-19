"use client";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface PokemonSkeletonProps {
  count?: number;
}

export default function PokemonSkeleton({ count = 1 }: PokemonSkeletonProps) {
  return (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f1f5f9">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            {/* Image skeleton */}
            <div className="flex justify-center mb-4">
              <Skeleton circle height={120} width={120} />
            </div>
            
            {/* Name skeleton */}
            <div className="text-center mb-2">
              <Skeleton height={24} width="60%" className="mx-auto" />
            </div>
            
            {/* ID skeleton */}
            <div className="text-center mb-3">
              <Skeleton height={16} width="30%" className="mx-auto" />
            </div>
            
            {/* Types skeleton */}
            <div className="flex justify-center gap-2 mb-4">
              <Skeleton height={20} width={60} />
              <Skeleton height={20} width={60} />
            </div>
            
            {/* Stats skeleton */}
            <div className="space-y-2">
              <Skeleton height={12} width="100%" />
              <Skeleton height={12} width="80%" />
              <Skeleton height={12} width="90%" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
}
