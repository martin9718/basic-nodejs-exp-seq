const bcrypt = require("bcryptjs");
const {
    User, UserAdress
} = require("../database/models/User");

const base64 = require("base-64");



require("../config/config");


//Get users
const findUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: UserAdress
        });


        return res.status(200).json({
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error
        });
    }
};

//Registrar Usuario
const registerUser = async (req, res) => {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);

    if (!body.first_name || !body.last_name || !body.email || !body.password || !body.user_rol_id) return res.status(400).json({
        error: "Incomplete fields"
    });

    const user = {
        first_name: body.first_name,
        last_name: body.last_name,
        full_name: body.first_name + " " + body.last_name,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt),
        email_token: base64.encode(body.email),
        user_rol_id: body.user_rol_id

    };

    const userAddress = {
        street : body.street,
        number_street: body.number_street,
        city: body.city,
        state: body.state
    }

    try {
        const newUser = await User.create(user);

        const newUserAddress = await UserAdress.create(userAddress);

        await newUser.setUserAdress(newUserAddress);

        return res.status(200).json({
            message: 'User successfully registered'
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: 'Failed to register user'
        })
    }


};

const updateUser = async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    const salt = bcrypt.genSaltSync(10);

    console.log(body.password);

    if (!body.first_name || !body.last_name || !body.email || !body.user_rol_id) return res.status(400).json({
        error: "Incomplete fields"
    });

    let user;

    if (body.password) {
        user = {
            first_name: body.first_name,
            last_name: body.last_name,
            full_name: body.first_name + " " + body.last_name,
            password: bcrypt.hashSync(body.password, salt),
            email: body.email,
            user_rol_id: body.user_rol_id

        };
    } else {
        user = {
            first_name: body.first_name,
            last_name: body.last_name,
            full_name: body.first_name + " " + body.last_name,
            email: body.email,
            user_rol_id: body.user_rol_id

        };
    }


    try {
        await User.update(user, {
            where: {
                id
            }
        });

        return res.status(200).json({
            message: 'User updated successfully'
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Error updating user'
        })
    }


};


const desactiveUser = async (req, res) => {

    const id = req.params.id;


    const user = {
        is_active: 0
    }

    try {
        await User.update(user, {
            where: {
                id
            }
        });
        return res.status(200).json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: 'Failed to delete user'
        });
    }
}


module.exports = {
    registerUser,
    findUsers
};