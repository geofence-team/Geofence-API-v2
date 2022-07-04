const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const response = require("../responses");
const models = require("../../models");

const verifyUser = (req, res, next) => {
  try {
    const token =
      req?.cookies?.jwt ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;

      if (!token) return response.unauthenticated(res);
    // verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // return an error if there was an issue verifying the token
      if (err) {
        return response.unauthorized(res);
      } else {
        // set the user data to the req obj using the decoded token payload
        req.user = decoded
        // call the next middleware
        return next();
      }
    });
  } catch (err) {
    console.error(err);
    return response.serverError(res);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////

const hashPassword = (plainTextPassword) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(plainTextPassword, salt);
  return hash;
};

/////////////////////////////////////////////////////////////////////////////////////////////////

const comparePasswords = (plainTextPassword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
};

/////////////////////////////////////////////////////////////////////////////////////////////////

const signUser = (user) => {
  console.log("idk",user)
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      roleId: user.roleId
    },
    process.env.JWT_SECRET, 
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const isAdmin = async (req, res, next)=> {
  const roleId = req.user.roleId;
  if (roleId == "ADMIN") {
        return next();
    }
    else {
      response.serverError(res);
    }
}


const isAdminOrManager = async (req, res, next)=> {
  const roleId = req.user.roleId;
  if (roleId == "ADMIN" || roleId == "MANAGER") {
        return next();
    }
    else {
      response.unauthorized(res);
    }
}
module.exports = {
  signUser,
  verifyUser,
  hashPassword,
  comparePasswords,
  isAdmin,
  isAdminOrManager
};
