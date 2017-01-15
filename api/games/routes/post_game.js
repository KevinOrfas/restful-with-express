'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Game = require('../model/Game');
const router = express.Router();

router.route('/')
    .post((req, res) => {

        const game = new Game(req.body);

        game.save((err, game) => {
            if(err) {
                res.status(400).json(err);
            }

            res,json(game);
        });
    });


    module.exports = router;