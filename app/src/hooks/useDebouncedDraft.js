/**
 * Custom hook for debounced draft generation
 * Implements the live draft projection with debouncing
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { generateDraft } from '../services/draftAssembly';

const DEBOUNCE_DELAY = 1500; // 1.5 seconds

export const useDebouncedDraft = (formData, isEnabled = true) => {
  const [draft, setDraft] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  
  const debounceTimer = useRef(null);
  const previousFormData = useRef(null);
  
  const generateDraftDebounced = useCallback(async (data) => {
    // Don't generate if issue description is too short
    if (!data.issueDescription || data.issueDescription.trim().length < 10) {
      setDraft(null);
      return;
    }
    
    // Don't regenerate if data hasn't changed
    if (JSON.stringify(data) === JSON.stringify(previousFormData.current)) {
      return;
    }
    
    previousFormData.current = data;
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generateDraft(data);
      
      if (result.success) {
        setDraft(result);
        setLastUpdated(new Date());
      } else {
        setError(result.message || 'Failed to generate draft');
      }
    } catch (err) {
      console.error('Draft generation error:', err);
      setError('An error occurred while generating the draft');
    } finally {
      setIsGenerating(false);
    }
  }, []);
  
  useEffect(() => {
    if (!isEnabled) {
      return;
    }
    
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new timer
    debounceTimer.current = setTimeout(() => {
      generateDraftDebounced(formData);
    }, DEBOUNCE_DELAY);
    
    // Cleanup
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [formData, isEnabled, generateDraftDebounced]);
  
  return {
    draft,
    isGenerating,
    lastUpdated,
    error
  };
};
