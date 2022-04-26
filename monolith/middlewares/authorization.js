const IAM = require("../models/IAM")
const { Op } = require("sequelize")
const {READ, WRITE} = require("../lib/addIAM").constants

module.exports = (options = {}) => async (req, res, next) => {
    if (options.role){
        if (req.user.role !== options.role) {
            return res.sendStatus(403)
        } else {
            if(options.checkACL === false) {
                return next()
            }
        }
    }
    const resources = req.originalUrl.match(/\/[a-z]+\/[0-9]+/g)
    if (resources) {
        
        const userIAM = await IAM.findAll({ where: { 
            UserId: req.user.id, 
            [Op.or]: resources.map(resource => {
                const [, name, id] = resource.split('/')
                return {resourceType: name, resourceId: id}
            }) 
        } })
        
        for (const key in resources) {
            const resource = resources[key]
            const [, name, id] = resource.split('/')
            const iam = userIAM.find(iam => console.log(iam, name, id, iam.resourceType === name && iam.resourceId === id) || iam.resourceType === name && iam.resourceId === id)
            console.log(userIAM)
            if (!iam) {
                return res.sendStatus(403)
            }
            if(key !== resources.length - 1) {
                if (iam.acl & READ !== READ) {
                    return res.sendStatus(403)
                }
            } else {
                const method = req.method
                const neededACL = method === "GET" ? READ :  WRITE
                if(iam.acl & neededACL !== neededACL) {
                    return res.sendStatus(403)
                }
            }
        }
    }

    return next()
}