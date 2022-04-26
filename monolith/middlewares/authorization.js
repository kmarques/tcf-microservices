module.exports = (options = {}) => async (req, res, next) => {

    if (options.role){
        if (req.user.role !== options.role) {
            return res.status(403)
        } else {
            if(options.checkACL === false) {
                return next()
            }
        }
    }

    const resources = req.path.match(/\/[a-z]+\/[0-9]+/g)
    if (resources) {

        const userIAM = await IAM.findAll({ where: { 
            userId: req.user.id, 
            [Op.or]: resources.map(resource => {
                const {name, id} = resource.split('/')
                return {ressourceType: name, ressourceId: id}
            }) 
        } })

        for (const resource of resources) {
            const {name, id} = resource.split('/')
            const iam = userIAM.find(iam => iam.ressourceType === name && iam.ressourceId === id)
            if (!iam) {
                return res.sendStatus(403)
            }
        }
    }

    return next()
}