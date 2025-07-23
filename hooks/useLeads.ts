import { mockLeads } from '@/data/mockLeads';
import { useEffect, useState } from 'react';
import { Lead } from '../types/lead';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data
        setLeads(mockLeads);
      } catch (err) {
        console.error('Error fetching leads:', err);
        setError('Failed to fetch leads. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return { leads, isLoading, error };
}