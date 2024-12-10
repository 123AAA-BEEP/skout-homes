export const logError = (error: Error | any, context?: Record<string, any>) => {
  console.error('Error:', {
    message: error.message || error,
    stack: error.stack,
    ...context
  });
};

export const logWarning = (message: string, context?: Record<string, any>) => {
  console.warn('Warning:', {
    message,
    ...context
  });
};

export const logInfo = (message: string, context?: Record<string, any>) => {
  console.info('Info:', {
    message,
    ...context
  });
}; 