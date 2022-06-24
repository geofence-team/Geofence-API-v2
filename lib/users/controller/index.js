var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");


async function signUp(req, res, next) {
  let username = req?.body?.username;
  let email = req?.body?.email;
  let name = req?.body?.name;
  let password = req?.body?.password;
  if (!name || !username || !email || !password) {
    return response.failedWithMessage(
      "username, name, email, and password are required in the req body",
      res
    );
  }
  try {
    const result = await service.signup(name, username, email, password);
    if (result?.code === 0) {
      return response.successWithMessage(result?.data, res);
    } else if (result?.code === 1) {
      return response.failedWithMessage(result?.data, res);
    } else {
      return response.notAcceptable(res);
    }
  } catch (e) {
    console.error(e);
    return response.serverError(res);
  }
}

///////////////////////////////////////////////////////////////////////////////

async function signIn (req, res) {
  let { email, password } = req.body;
  if (!email || !password) {
    return response.failedWithMessage(
      "email and password are required in req body",
      res
    );
  }
  try {
    const result = await service.signIn(email, password);
    if (result?.code === 0) {
      res.cookie("jwt", result.data.token); // <--- Adds token to response as a cookie
      return response.success(result.data, res);
    } else if (result?.code === 1) {
      return response.failedWithMessage(result?.data, res);
    } else {
      return response.notAcceptable(res);
    }
  } catch (e) {
    console.error(e);
    return response.serverError(res);
  }
};

///////////////////////////////////////////////////////////////////////////////

async function getProfile  (req, res) {
  try {
    const userId = req.user.id;
    const result = await service.getProfile(userId);
    if (result?.code === 0) {
      return response.success(result.data, res);
    } else if (result?.code === 1) {
      return response.failedWithMessage(result?.data, res);
    } else {
      return response.notAcceptable(res);
    }
  } catch (e) {
    return response.serverError(res);
  }
};

///////////////////////////////////////////////////////////////////////////////

async function signOut(req, res) {
  res.cookie("jwt", "", { expires: new Date(0) });
  return response.successWithMessage("Signed out", res);
}

///////////////////////////////////////////////////////////////////////////////

module.exports = {
  signUp,
  signIn,
  getProfile,
  signOut
};
