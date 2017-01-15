'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Game = require('../model/Game');
const router = express.Router();

router.route('/:id')
    .delete((req, res) => {

        const _id = req.params.id;

        Game.findOneAndRemove({ _id }, (err,game) => {
            if(err) {
                res.status(400).json(err);
            }

            if(!game) {
                res.status(404).json({ message : 'Not game found' })
            }

            res.json({message: `Game with id ${game._id} deleted` });
        });
    });


    module.exports = router;