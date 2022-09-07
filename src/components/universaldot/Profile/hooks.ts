import { useAsync } from 'react-use';
import { tfAPI } from 'src/api';

export const useRecommendations = (interests: string[], taskKeywords: string[]) => {
  return useAsync(() => tfAPI.preditc({ instances: [...interests, ...taskKeywords] }), []);
};
