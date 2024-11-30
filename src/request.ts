const requestUtil = async (path = "", options = {}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...options,
  });
};

export default requestUtil;
