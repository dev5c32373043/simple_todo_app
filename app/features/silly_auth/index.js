const jwt        = require('jsonwebtoken');
const jwtSecret  = require(`${process.cwd()}/config`)[NODE_ENV].jwtSecret;
const crypto     = require('crypto');

const generateOwnerId = async ()=>{
  const buffer = await crypto.randomBytes(256);
  return buffer.toString('hex');
}

module.exports = async (req, res, next)=>{
  if(req.signedCookies && req.signedCookies.jwt){
    const token = req.signedCookies.jwt;
    jwt.verify(token, jwtSecret, (error, decoded)=>{
      if(error) return console.error(error);
      req.ownerId = decoded.ownerId;
      next()
    });
  }else{
    const ownerId = await generateOwnerId();
    let payload = {ownerId: ownerId};
    const token = jwt.sign(payload, jwtSecret);
    res.cookie('jwt', token, {
      expires: new Date(2033, 11, 11),
      httpOnly: true,
      signed: true
    });
    req.ownerId = payload.ownerId;
    next()
  }
}
