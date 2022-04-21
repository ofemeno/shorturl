const express = require('express');
const router = express.Router()
const Url = require('../models/Url')


router.get('/:code', async (req, res) => {
    const code = req.params.code;
    try{
        const url = await Url.findOne({urlCode: code});
        if(url){
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).json("no url found")
        }
    }
    catch(e){
        console.error(e);
        res.status(500).json("server error")
    }
})

module.exports = router;