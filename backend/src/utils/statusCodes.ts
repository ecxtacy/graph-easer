// Status Codes.
export enum StatusCodes {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
}

// Corresponding map to define messages for each codes.
export const StatusMessage: Record<StatusCodes, string> = {
  [StatusCodes.SUCCESS]: "Success",
  [StatusCodes.CREATED]: "Created",
  [StatusCodes.ACCEPTED]: "Accepted",
  [StatusCodes.BAD_REQUEST]: "Bad Request",
  [StatusCodes.UNAUTHORIZED]: "Unauthorized",
  [StatusCodes.FORBIDDEN]: "Forbidden",
  [StatusCodes.NOT_FOUND]: "Not found",
  [StatusCodes.METHOD_NOT_ALLOWED]: "Method not Allowed",
  [StatusCodes.NOT_ACCEPTABLE]: "Not Accepted",
  [StatusCodes.REQUEST_TIMEOUT]: "Request Timeout",
};
