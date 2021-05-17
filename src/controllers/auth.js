const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, AccessToken, UserRole } = require("../database/models/User");
const nodemailer = require("nodemailer");

require("../config/config");

//LOGIN
const login = async (req, res) => {
    const body = req.body;
    let userDB;
    try {
        userDB = await User.findOne({
            include: UserRole,
            where: {
                email: body.email
            }
        });
    } catch (error) {

        console.log(error);
    }
    if (userDB == null) {

        return res.status(400).json({
            error: "Incorrect user or password"
        });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
        return res.status(400).json({
            error: "Incorrect user or password"
        });
    }

    const access_token = jwt.sign({
            user: userDB,
        },
        process.env.SEED, {
            expiresIn: process.env.EXPIRATION_TOKEN,
        }
    );

    const accessToken = {
        token: access_token,
        expiry_time: process.env.EXPIRATION_TOKEN
    }

    try {
        await AccessToken.create(accessToken);
    } catch (error) {
        console.log(error);
    }

    const user = {
        id: userDB.id,
        full_name: userDB.full_name,
        email: userDB.email,
        user_rol_id: userDB.user_rol_id,
        user_rol_name: userDB.UserRole.name
    }


    return res.status(200).json({
        token: access_token,
        user
    });
};

//Verify token
const verifyToken = async (req, res) => {

    const token = req.get('token');


    if (!token) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }

    const accessTokenDB = await AccessToken.findOne({
        where: {
            token: token
        }
    });

    if (accessTokenDB == null) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }

    jwt.verify(token, process.env.SEED, (error, decoded) => {

        if (error) {
            console.log(error);
            accessTokenDB.destroy();
            return res.status(403).json({
                error: 'Access denied'
            });
        }
        const data = decoded.user;

        const user = {
            id: data.id,
            full_name: data.full_name,
            email: data.email,
            user_rol_id: data.user_rol_id
        }

        return res.status(200).json({
            user
        });

    });

};



module.exports = {
    login,
    verifyToken,
};