const models = require("../../../models");
const authService = require("../../auth-services");

exports.signup = async (name, username, email, password) => {
  try {
    let [result, created] = await models.User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        name,
        username,
        email,
        password: authService.hashPassword(password),
      },
    });
    if (created) {
      return { code: 0, data: "user created" };
    } else {
      return { code: 1, data: "This user already exists" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

//////////////////////////////////////////////////////////////////////
exports.signIn = async (email, password) => {
  try {
    let user = await models.User.findOne({
      where: {
        email
      },
    });
    let isActive = user.isActive;
    if (!user) {
      return { code: 1, data: "incorrect credentials" };
    } else {
      let passwordMatch = authService.comparePasswords(password, user.password);
      if (passwordMatch && isActive == 1) {
        let token = authService.signUser(user); // <--- Uses the authService to create jwt token
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

//////////////////////////////////////////////////////////////////////

exports.getProfile = async (userId) => {
  try {
    let query = `SELECT 
    name, username, email, createdAt
FROM
    users
WHERE
    id = :userId;`;
    const data = await models.sequelize.query(query, {
      replacements: {
        userId,
      },
      type: models.sequelize.QueryTypes.SELECT,
    });
    if (data) {
      return { code: 0, data: data[0] };
    } else {
      return { code: 1, data: "failed to fetch user profile" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};




