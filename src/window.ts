export {};

declare global {
  interface Window {
    env: {
      IPFS_URL: string;
      TENSORFLOW_URL: string;
    };
  }
}

const windowInstance: Window = window;

if (!window.env) {
  window.env = {
    IPFS_URL: process.env.REACT_APP_IPFS_URL!,
    TENSORFLOW_URL: process.env.REACT_APP_TENSORFLOW_URL!,
  };
} else {
  window.env = {
    IPFS_URL: window.env.IPFS_URL,
    TENSORFLOW_URL: window.env.TENSORFLOW_URL,
  };
}

export default windowInstance;
