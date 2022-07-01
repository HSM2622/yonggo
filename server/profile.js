const express = require('express')
const router = express.Router();
const {User} = require('./models');

router.get('/', async (req, res, next) => {
    if (req.user.username === '') {
        res.redirect('/login')
    } else {
        try {
            let result = await User.findOne({
                raw: true,
                where: {
                    useremail: req.user.useremail
                },
                attributes: ['useremail', 'username', 'usercomment', 'phonenum', 'usercode', 'userimg']
            })
            if (req.user.userimg == 'default.png') {
                result.userimg = '/img/default.png';
            } else {
                result.userimg = req.user.userimg;
            }
            res.render('profile.html', {user: result, username: req.user.username, isLogin: req.isLogin});
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
})

module.exports = router;
