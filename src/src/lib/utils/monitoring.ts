export const logError = (error: Error, context?: Record<string, any>) => {
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    ...context
  });
  
  // TODO: Add error reporting service integration (e.g., Sentry)
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