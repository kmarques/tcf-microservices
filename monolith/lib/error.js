exports.formatError = (error) =>
  Object.keys(error.errors).reduce((acc, err) => {
    acc[err] = error.errors[err].message;
    return acc;
  }, {});
