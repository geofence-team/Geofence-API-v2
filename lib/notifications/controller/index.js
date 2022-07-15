var models = require('../../../models');
let service = require('../service');
let response = require('../../responses');

///GET NOTIFCITIONS BY GEOID BY TEACHER///

async function getUserNotifications(req, res) {
  const {id} = req.params;
  
  try {
    const result = await service.getUserNotifications(id);
    console.log(result, "ggggg")
    if (result?.code === 0) {
      return response.success(result?.data, res);
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

///UPDATE NOTIFCITIONS BY TEACHER ///

async function updateUserNotifications(req, res, next) {
  const {isOn, id: nId} = req.params;
  try {
    const result = await service.updateUserNotifications(isOn,nId);
    console.log(result, "uuuuu")
    if (result?.code === 0) {
      return response.success(result?.data, res);
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


module.exports = {
  getUserNotifications,
  updateUserNotifications
}