const _chunk = require("lodash/chunk");

const paginateRequest = async (req, query) => {
  let { page, perpage = 4 } = query;
  const response = _chunk(await req, parseInt(perpage));
  return JSON.stringify({
    data: response[parseInt(page)],
    cursor: page >= response.length - 1 ? null : parseInt(page) + 1,
  });
};

module.exports = paginateRequest;
