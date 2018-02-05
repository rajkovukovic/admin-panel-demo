const errorMapObj = {
  'Failed to fetch': 'Connection problem',
};

const transformerFn = (error) => {
  if (error && error.message) {
    const { message } = error;
    return errorMapObj[message] || message;
  }
  return errorMapObj[error] || error;
};

export default transformerFn;
