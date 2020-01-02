module.exports = {
    usersOnly: (req, res, next) => {
        if(!req.session.user){
            res.status(401).send('pls login')
        } 
        next()
    },
    adminsOnly: (req, res, next) => {
        if(!req.session.user.isAdmin){
            res.status(403).send('ur not admin')
        }

        next()

        
    }
}