var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");
let auth = require("../../auth-services");


async function signUp(req, res, next) {
  let username = req?.body?.username;
  let email = req?.body?.email;
  let name = req?.body?.name;
  let password = req?.body?.password;
  let roleId = req?.body?.roleId;
  
  if (!name || !username || !email || !password || !roleId) {
    return response.failedWithMessage(
      "username, name, email, roleId and password are required in the req body",
      res
    );
  }
  try {
    const result = await service.signup(name, username, email, password,roleId);
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


async function update (req, res, next) {
  let response = {
      messages: [],
      success: true,
      data: {}
  }
  const id = req.params.id
  if (isNaN(id)) {
      response.messages.push("Please provide a valid ID")
      response.success = false
      res.send(response)
      return
  }
  if (!req.body?.name?.length) {
      response.messages.push("Please add a name")
      response.success = false
  }
  if (!req.body?.username?.length) {
    response.messages.push("Please add a username")
    response.success = false
}
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body?.email))) {
      response.messages.push("Please add a valid email")
      response.success = false
  }

  if (!response.success) {
      res.send(response)
      return
  }

const updated = await models.Users.findByPk(id)
  if (updated) {
      if (req.body.name) {
          updated.name = req.body.name
      }
      if (req.body.username) {
          updated.username = req.body.username
      }
      if (req.body.email) {
          updated.email = req.body.email
      }
      updated.save().then(() => {
          response.messages.push('Successfully Updated')
          response.success = true
          res.send(response)
      })
  } else {
      res.status(400);
      response.messages.push('There was a problem updating the user.  Please check the user information.')
      response.success = false
      res.send(response)
  }
  
}

module.exports = {
  signUp,
  signIn,
  getProfile,
  signOut, update
};
