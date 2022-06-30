var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");

async function admninSignIn(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return response.failedWithMessage(
      "email and password are required in req body",
      res
    );
  }
  try {
    let result = await service.admninSignIn(email, password);
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
}

///////////////////////////////////////////////////////////////////////////////

async function getUsers(req, res) {
  models.User.findAll({})
    .then((users) => {
      if (users.length) {
        let newUsers = users.map((user) => {
          let { password, updatedAt, ...rest } = user.dataValues;
          return rest;
        }); 

        return response.success(newUsers, res);
      } else {
        return response.successWithMessage("No Users Found!", res);
      }
    })
    .catch((e) => {
      console.error(e);
      return response.serverError(res);
    });
}

///////////////////////////////////////////////////////////////////////////////

async function deactivate(req, res, next) {
  try {
    const userID = req.params.id;
    const result = await service.deactivate(userID);
    if (result) {
      return response.successWithMessage("User is now deactivated", res);
    }
    return response.failedWithMessage("User is already deactivated", res);
  } catch (e) {
    return response.serverError(res);
  }
}

///////////////////////////////////////////////////////////////////////////
async function activate(req, res, next) {
  try {
    const userID = req.params.id;
    const result = await service.activate(userID);
    if (result) {
      return response.successWithMessage("User is now activated", res);
    } 
    return response.failedWithMessage("User is already active", res);
  } catch (e) {
    return response.serverError(res);
  }
}
/////////////////////////////////////////////////////////////////////////

async function adminSignOut(req, res) {
  res.cookie("jwt", "", { expires: new Date(0) });
  return response.successWithMessage("Signed out", res);
}

/////////////////////////////////////////////////////////////////////////

module.exports = {
  admninSignIn,
  adminSignOut,
  deactivate,
  activate,
  getUsers,
};
