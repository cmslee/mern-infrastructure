//* Request handler logic

//!make sure you are importing the model, so capital U
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//*helper function

function createJWT(user) {
    return jwt.sign(
        //data payload
        {user},
        process.env.SECRET,
        //if you do not include the "h" in "24h", your token will be rejected
        {expiresIn: '24h'}
    )
}

async function create (req, res) {
    // console.log('[From POST handler]', req.body)
    /**
     * this is dummy data that we deleted when we started to link everything via async function
    res.json({
        user: {
            name: req.body.name,
            email: req.body.email
        }
    })
    */
        
    try {
        //*create new user
        const user = await User.create(req.body);
        //!checkpoint
        console.log(user);

        //*create JWT
        const token = createJWT(user); //this token will be a string
        res.json(token); //the token that gets return can be decoded via jwt.oi
    } catch (error) {
        // console.log(error);

        //*set error code (see https cats lol)
        res.status(400).json(error);
    }
}

async function login(req, res) {
    try {
        // find the user by email
        const user = await User.findOne({email: req.body.email})
        // console.log('[USER FOUND]', user)
        if(!user) throw new Error();        
        // if user exists: compare the pw to hashed pw
        //? compare the requested password and the one stored in db/cache
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        // if pw is a match create token
        res.json(createJWT(user));

    } catch (error) {
        res.status(400).json({error: 'Bad credentials'})
    }
}


async function checkToken(req, res) {
    console.log(req.user);
    res.json(req.exp)
}

module.exports = {
    create,
    login,
    checkToken
}