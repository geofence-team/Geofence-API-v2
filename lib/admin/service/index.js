const models = require("../../../models");
const auth = require("../../auth-services");

// exports.signup = async (name, username, email, password) => {
//   try {
//     let [result, created] = await models.User.findOrCreate({
//       where: {
//         email,
//       },
//       defaults: {
//         name,
//         username,
//         email,
//         password: authService.hashPassword(password),
//       },
//     });
//     if (created) {
//       return { code: 0, data: "user created" };
//     } else {
//       return { code: 1, data: "This user already exists" };
//     }
//   } catch (e) {
//     console.error(e);
//     throw new Error(e);
//   }
// };

/////////////////////////////////////////////////////////////////////////////////

exports.admninSignIn = async (email, password) => {
  try {
    const { Op } = require("sequelize");
    let user = await models.User.findOne({
      where: {
        email,
        isActive: 1,
        [Op.or]: [
          { roleId: "ADMIN" },
          { roleId: "MANAGER" } ]
      },
    });
    if (!user) {
      return { code: 1, data: "incorrect credentials" };
    } else {
      // console.log(user.dataValues, "kkkk")
      let passwordMatch = auth.comparePasswords(password, user.password);
      if (passwordMatch) {
        let token = auth.signUser(user.dataValues); // <--- Uses the authService to create jwt token
        let { password, updatedAt, createdAt, ...rest } = user.dataValues;
        return { code: 0, data: { ...rest, token } };
      } else {
        return { code: 1, data: "incorrect credentials" };
      }
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

/////////////////////////////////////////////////////////////////////////////////

exports.getAllUsers = async (users) => {
  try {
    const data = await models.User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: models.User,
          where: { deletedAt: null },
        },
      ],
    });
    if (data.length > 0) {
      return { code: 0, data };
    } else if (data.length === 0) {
      return { code: 0, data: "users not found" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

/////////////////////////////////////////////////////////////////////////////////

exports.deactivate = async (userID) => {
  try {
    let user = await models.User.findByPk(userID);
    let isActive = user.isActive
    let roleId = user.roleId
    if (!user) return null;
    if (isActive == 1 && roleId === "TEACHER" || roleId === "DRIVER" ){
      let result = models.User.update(
        {
          isActive: 0,
        },
        {
          where: {
            id: userID,
          },
        }
      );
      return result;
    } } catch (err) {
      throw new Error(err);
    }
};

//////////////////////////////////////////////////////////////////////////////

exports.activate = async (userID) => {
  try {
    let user = await models.User.findByPk(userID);
    let isActive = user.isActive
    if (!user) return null;
    if (isActive == 0){
      let result = models.User.update(
        {
          isActive: 1,
        },
        {
          where: {
            id: userID,
          },
        }
      );
      return result;
    } } catch (err) {
      throw new Error(err);
    }
};

///////////////////////////////////////////////////////////////
exports.deactivateGeofence = async (geofenceID) => {
  try {
    let geofence = await models.Geofence.findByPk(geofenceID);
    let isActive = geofence.isActive
    if (!geofence) return null;
    if (isActive == 1 ){
      let result = models.Geofence.update(
        {
          isActive: 0,
        },
        {
          where: {
            id: geofenceID,
          },
        }
      );
      return result;
    } } catch (err) {
      throw new Error(err);
    }
};

//////////////////////////////////////////////////////////////////////////////

exports.activateGeofence = async (geofenceId) => {
  try {
    let geofence = await models.Geofence.findByPk(geofenceId);
    let isActive = geofence.isActive
    if (!geofence) return null;
    if (isActive == 0){
      let result = models.Geofence.update(
        {
          isActive: 1,
        },
        {
          where: {
            id: geofenceId,
          },
        }
      );
      return result;
    } } catch (err) {
      throw new Error(err);
    }
};

exports.changeStatus = async (userID) => {
  try {
    let user = await models.User.findByPk(userID);
    if (!user) return null;
    if (user.roleId == "ADMIN") {
      return;
    }
    let result = models.User.update(
      {
        isActive: !user["dataValues"].isActive,
      },
      {
        where: {
          id: userID,
        },
      }
    );
    return result;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};