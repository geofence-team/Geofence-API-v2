let response = require("../../responses");
const { sequelize, User, Geofence, Point } = require("../../../models");

const canViewGeo = async (req, res, next) => {
    try {
        const { id: geoFenceId } = req.params;
        const userId = req.user.id;
        // check if it the owner
        let q1 = `SELECT 
        id,
        ttGeoId
    FROM
        geofences
    WHERE
        userId = :userId AND id = :geoFenceId AND isActive = 1
            AND deletedAt IS NULL;`
        // check if the requester is accepted
        let q2 = `SELECT 
        gr.id,
        g.ttGeoId AS ttGeoId
    FROM
        geofences g
            JOIN
        geofencerequests gr ON gr.geofenceId = :geoFenceId and g.id = :geoFenceId
    WHERE
        gr.userId = :userId AND gr.isAccepted = 1
            AND g.isActive = 1
            AND g.deletedAt IS NULL
    GROUP BY gr.id;`

        const validate1 = await sequelize.query(q1, {
            replacements: {
                geoFenceId,
                userId,
            }
        });
        const validate2 = await sequelize.query(q2, {
            replacements: {
                geoFenceId,
                userId,
            }
        });
        if (validate1[0]?.[0]?.id || validate2[0]?.[0]?.id) {
            req.ttGeoId = validate1[0]?.[0]?.ttGeoId || validate2[0]?.[0]?.ttGeoId
            return next();
        }
        else {
            return response.failedWithMessage("Access denied", res);
        }
    }
    catch (e) {
        console.error(e)
        return response.serverError(res);

    }
}

module.exports = {
    canViewGeo
};
