const IAM = require("../models/IAM")

exports.constants = {READ : 1, WRITE : 2}

exports.addIAM = async (resourceType, resourceId, acl) => {
    try {
        const newIAM = await IAM.create({
            resourceType: resourceType,
            resourceId: resourceId,
            acl: acl
        })
        res.status(201).json(newIAM)
    } catch (err) {
        if (err instanceof Sequelize.ValidationError) {
            res.status(400).json(format(err))
        } else {
            res.status(500).json({ message: err.message })
        }
    }
}