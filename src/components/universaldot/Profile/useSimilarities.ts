import { useAsync } from 'react-use';
import { tfAPI } from 'src/api';

export const useSimilarities = (interests: string[], task: string) => {
  return useAsync(() => tfAPI.preditc({ inputs: interests, instances: task }), []);
};
