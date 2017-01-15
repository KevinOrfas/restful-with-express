'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Game = require('../model/Game');
const router = express.Router();

router.route('/:id')
    .put((req, res) => {

        const _id = req.params.id;

        Game.findOneAndUpdate({ _id }, 
            req.body,
            { new : true },
            (err, game) => {
                if(err) {
                    res.status(404).json(err);
                }

                res.json(game);
            }
        );
    });


    module.exports = router;