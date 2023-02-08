
const jwt = require('jsonwebtoken');
import User from '../models/User'

const auth = async (req, res) => {
  // GEt the user from the JWT token and append the id to req body
  const token = req.headers.authtoken

  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" })
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(!decoded) return res.status(401).send({ error: "Please authenticate using a valid token" })

  const user = await User.findOne({ _id: decoded.user.id }).select('-password')
  return user

}
export default auth;