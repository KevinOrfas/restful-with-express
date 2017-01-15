'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Game = require('../model/Game');
const router = express.Router();

router.route('/')
    .get((req, res) => {

        Game.find({}, (err,games) => {
            if(err) {
                res.status(404).json(err);
            }

            res.json(games);
        });
    });


    module.exports = router;