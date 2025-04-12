// utils.js
export const formatId = (str) => {
    return str.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
  };
  