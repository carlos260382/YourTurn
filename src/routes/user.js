const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
//intentando subir rutas.

const { User, Turn } = require('../db');

router.get('/', validateToken, async (req, res) => {
    const users = await User.findAll({ where: { active: true } });
    res.json(users);
});

router.get('/:id', validateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({
            where: { id: id, active: true },
            include: {
                model: Turn,
            },
        });

        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ message: 'user not found' });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    const { name, dni, email, password, centroName, rol } = req.body;

    try {
        const newUser = {
            name,
            dni,
            email,
            password,
            centroName,
            rol,
        };

        console.log('req -> ' + JSON.stringify(req.body));
        await User.create(newUser);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'spotyfoty2@gmail.com',
                pass: 'vjqkenpthvvquuyy',
            },
        });

        const mailOptions = {
            from: 'Remitente',
            to: email,
            subject: 'Registrado en Your Turn!',
            text: `¡Gracias ${name} por registrarte en nustra web!`,
        };

        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email enviado');
            }
        });

        return res.json({ message: 'new user created!', user: newUser });
    } catch (err) {
        return res.json({
            message: 'user already exists!',
        });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (user) {
            await User.update(
                { active: false },
                {
                    where: {
                        id: id,
                    },
                }
            );
            return res.json({ message: `user ${id} deleted` });
        } else {
            return res.json({ message: 'user not found' });
        }
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, lastName, address, phone, dni, email, password } = req.body;

    try {
        const user = await User.findByPk(id);
        if (user) {
            const userUpdated = await User.update(
                { name, lastName, address, phone, dni, email, password },
                { where: { id: id } }
            );
            return res.json({ message: `user ${id} updated`, userUpdated });
        } else {
            return res.json({ message: 'user not found' });
        }
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const validation = await User.findAll({
            where: {
                email: email,
                password: password,
                active: true,
            },
        });

        if (!validation.length) {
            return res.json({ message: 'user not found' });
        } else {
            const accessToken = generateAccessToken({ email, password });
            res.header('authorization', accessToken).json({
                id_user: validation[0].id,
                message: 'usera auth',
                token: accessToken,
            });
            console.log(
                'id_user -> ' + validation[0].id + ' Token -> ' + accessToken
            );
        }
    } catch (err) {
        console.log(err);
    }
});

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.SECRET);
}

function validateToken(req, res, next) {
    const accessToken = req.header('authorization');
    if (!accessToken) return res.status(403).json('access denied!');
    jwt.verify(accessToken, process.env.SECRET, (err) => {
        if (err) {
            return res.json({
                message: 'access denied: token invalid or expired',
            });
        } else {
            next();
        }
    });
}

module.exports = router;
