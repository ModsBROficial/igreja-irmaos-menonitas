import jwt from 'jsonwebtoken'

const createToken = async (user, req, res) => {

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)
    
    user.password = undefined

    res.status(200).json({
        token: token,
        user,
        message: { type: "success", data: "Usuário autenticado!" }
    })
}
module.exports = createToken