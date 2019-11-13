const router = require("express").Router();

const Users = require("./user-model");
const restricted = require('../auth/restricted-middleware.js');

router.get("/", restricted, checkDpt(["cooking"]), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err))
});

module.exports = router;

function checkDpt(dpt) {
    return function(req, res, next) {
        console.log(req.decodedJwt.role)
        if (dpt.includes(req.decodedJwt.role)) {
            next();
        } else {
            res.status(403).json({ message: "your department does not have access" })
        }
    }
}