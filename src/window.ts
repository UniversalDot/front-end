export {};

declare global {
  interface Window {
    env: {
      TENSORFLOW_URL: string;
    };
  }
}

const windowInstance: Window = window;

if (!window.env) {
  window.env = {
    TENSORFLOW_URL: process.env.REACT_APP_TENSORFLOW_URL!,
  };
} else {
  window.env = {
    TENSORFLOW_URL: window.env.TENSORFLOW_URL,
  };
}

export default windowInstance;
