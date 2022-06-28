exports.unauthorized = (res) => {
  let response = {
    auth: false,
    success: false,
    message: "unauthorized",
    time: Date.now(),
  };
  return res.status(401).json(response);
};

exports.unauthenticated = (res) => {
  let response = {
    auth: false,
    success: false,
    message: "unauthenticated, please login first",
    time: Date.now(),
  };
  return res.status(401).json(response);
};

exports.failedWithMessage = (msg, res) => {
  let response = {
    success: false,
    message: msg,
    time: Date.now(),
  };
  return res.status(400).json(response);
};

exports.serverError = (res) => {
  let response = {
    success: false,
    message: "something went wrong, please try again later.",
    time: Date.now(),
  };
  return res.status(500).json(response);
};

exports.forbidden = (res) => {
  let response = {
    success: false,
    message: "forbidden",
    time: Date.now(),
  };
  return res.status(403).json(response);
};

exports.notAcceptable = (res) => {
  let response = {
    success: false,
    message: "Not Acceptable",
    time: Date.now(),
  };
  return res.status(406).json(response);
};

exports.successWithMessage = (msg, res) => {
  let response = {
    success: true,
    message: msg,
    time: Date.now(),
  };
  return res.status(200).json(response);
};

exports.success = (result, res) => {
  let response = {
    success: true,
    message: "success",
    result: result,
    time: Date.now(),
  };
  return res.status(200).json(response);
};
