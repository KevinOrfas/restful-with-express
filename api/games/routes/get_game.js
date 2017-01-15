'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Game = require('../model/Game');
const router = express.Router();

router.route('/:id')
    .get((req, res) => {

        const _id = req.params.id;

        Game.findOne({ _id }, (err,game) => {
            if(err) {
                res.status(400).json(err);
            }

            if(!game) {
                res.status(404).json({ message : 'Not game found' })
            }

            res.json(game);
        });
    });


    module.exports = router;