import { useCallback } from 'react';
import behaviorOptions from './config';

const useButtonBehavior = () => {
  const openInNewTab = useCallback((url, behavior = behaviorOptions.DEFAULT) => {
    window.open(url, behavior);
  }, []);

  return openInNewTab;
};

export default useButtonBehavior;
