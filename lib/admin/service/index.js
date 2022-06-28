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
    let user = await models.User.findOne({
      where: {
        email,
        isActive: 1,
        roleType: "admin",
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
    if (!user) return null;
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
