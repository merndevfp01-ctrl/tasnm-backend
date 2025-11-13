const SUCCESS = {
  OK: "Fetched Successfully",
  CREATED: "Created Successfully",
  UPDATED: "Updated Successfully",
  DELETED: "Deleted Successfully",
  REGISTER: "Register Successfully",
  LOGIN: "Login Successfully"
};

const ERROR = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  ALREADY_EXISTS: "Already Exists",
  NOT_FOUND: "Not Found",
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized Access",
  INVALID: "Invalid"
};

const STATUSCODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

module.exports = { SUCCESS, ERROR, STATUSCODE };
