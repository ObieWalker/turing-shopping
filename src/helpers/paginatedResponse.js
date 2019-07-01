export const paginatedResponse = (response, page = 1) => {
  return {
    rows: response.rows,
    totalProducts: response.count,
    currentPage: page,
  };
};