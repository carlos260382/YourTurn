const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');
const { Turn, Center, User } = require('../db');

router.get('/', async (req, res) => {
    try {
        let turns = await Turn.findAll({
            include: [
                {
                    model: Center,
                    attributes: ['id', 'name', 'address'],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        res.json(turns);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params;
    try {
        let turn = await Turn.findOne({
            where: { id: id },
            include: [
                {
                    model: Center,
                    attributes: ['id', 'name', 'address'],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        res.json(turn);
    } catch (error) {
        res.send(error);
    }
});

router.post('/:email', async (req, res) => {
    const { dni, centro, dia, horario } = req.body;
    const { email } = req.params;

    try {
        const newTurn = {
            centro,
            dia,
            horario,
        };

        console.log('req -> ' + dni + centro + dia + horario);
        const turnCreated = await Turn.create(newTurn);
        
        const idUser = await User.findOne({ where: { dni } });
        console.log('findOneUser -> ' + JSON.stringify(idUser));

        turnCreated.addUser(idUser?.id);

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
            subject: '¡Nuevo Turno!',
            text: `Nuevo turno el dia ${dia} de ${horario} en ${centro}`,
        };

        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email enviado');
            }
        });

        return res.json({ message: 'New Turn created!', user: newTurn });
    } catch (err) {
        console.log(err);

        return res.json({
            message: 'Turn already exists!',
        });
    }
});

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    Turn.update(body, {
        where: {
            id,
        },
    })
        .then(() => {
            res.send('se modificó satisfactoriamente');
        })
        .catch((error) => next(error));
});

module.exports = router;
