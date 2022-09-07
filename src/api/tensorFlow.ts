import axios from 'axios';
import windowInstance from '../window';

interface PredictRequest {
  signature_name?: string;
  instances?: any;
  inputs?: any;
}

interface PredictResponse {
  predictions?: any;
  outputs?: any;
}

const { TENSORFLOW_URL } = windowInstance.env;
const MODELS_PATH = '/v1/models';

export const createTensorFlowAPI = () => {
  const basePath = `${TENSORFLOW_URL}${MODELS_PATH}`;

  return {
    async preditc(data: PredictRequest) {
      const result = await axios.post<PredictResponse>(`${basePath}/model:predict`, data);

      return result.data;
    },
  };
};

export const tfAPI = createTensorFlowAPI();
