import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../config"

// creatToken function
const creatToken = (payload: JwtPayload) => {
    const token = jwt.sign(payload, config.secretKey as string)
    return token
}

export default creatToken