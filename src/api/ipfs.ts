import windowInstance from '../window';
import { create } from 'ipfs-http-client';
import { useState } from 'react';

const { IPFS_URL } = windowInstance.env;
const VERSION_PATH = '/api/v0';

export const useIpfsAPI = () => {
  const [ipfsAPI] = useState(() => create({ url: `${IPFS_URL}${VERSION_PATH}` }));

  return ipfsAPI;
};
