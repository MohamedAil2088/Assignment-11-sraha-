import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIERS_IN,
  ACCESS_USER_TOKEN_SIGNATURE,
  REFRESH_TOKEN_EXPIERS_IN,
  REFRESH_ADMIN_TOKEN_SIGNATURE,
  ACCESS_ADMIN_TOKEN_SIGNATURE,
  REFRESH_USER_TOKEN_SIGNATURE,
} from "../../config.js";
import {
  BadExecuption,
  NotFoundExecuption,
  UnauthorizedException,
} from "../execuptions/error.execuptions.js";
import { findById, findOne } from "../repository/base.respository/base.repository.js";
import { UserModel } from "../../DB/model/user.model.js";
import { TokenTypeEnum } from "../../enum/security.enum.js";
import { RoleEnum } from "../../enum/user.gender.js";
import {randomUUID} from 'node:crypto'
import { exists, set } from "../services/index.js";
import { compare } from "./hash.security.js";

export const userBaseKey = ({userId})=>{
  return `User::${userId.toString()}`
} 
export const userBaseRevokrTokevKey = ({userId})=>{
  return `${userBaseKey({userId})}::Revoke_Token`
} 
export const userProfileKey = ({userId})=>{
  return `${userBaseKey({userId})}::Profile`
}
export const userBaseRevokeTokenKey = userBaseRevokrTokevKey;

export const userRevokrTokevKey = ({userId , jti})=>{
  return `${userBaseRevokrTokevKey({userId})}::${jti}`
} 
export const userRevokeTokenKey = userRevokrTokevKey; 

export const userLoginAttemptsKey = ({ email }) => {
  return `User::${email}::LoginAttempts`;
};


export const creatToken = async ({
  payload = {},
  secret = ACCESS_USER_TOKEN_SIGNATURE,
  options = {},
} = {}) => {
  return jwt.sign(payload, secret, options);
};
export const createToken = creatToken;

export const verifyToken = async ({
  token = "",
  secret = ACCESS_USER_TOKEN_SIGNATURE,
} = {}) => {
  return jwt.verify(token, secret);
};

const getTokenSignatures = async ({ role = RoleEnum.USER } = {}) => {
  let signatures;
  switch (role) {
    case (RoleEnum.ADMIN):
      signatures = {
        accessSignature: ACCESS_ADMIN_TOKEN_SIGNATURE,
        refreshSignature: REFRESH_ADMIN_TOKEN_SIGNATURE,
      };
      break;

    default:
      signatures = {
        accessSignature: ACCESS_USER_TOKEN_SIGNATURE,
        refreshSignature: REFRESH_USER_TOKEN_SIGNATURE,
      };
      break;
  }
  return signatures;
};

const getSignature = async ({ tokenType = TokenTypeEnum.ACCESS , role = RoleEnum.USER } = {}) => {
    const signatures = await getTokenSignatures({role})
  return tokenType == TokenTypeEnum.ACCESS
    ? signatures.accessSignature
    : signatures.refreshSignature;
};

export const decodeToken = async ({
  authorization = "",
  tokenType = TokenTypeEnum.ACCESS,
} = {}) => {
    const decoded = jwt.decode(authorization)
    console.log(decoded);
    if (!decoded?.aud?.length) {
        throw BadExecuption("missing token payload");
    }
    
  const payload = await verifyToken({
    token: authorization,
    secret: await getSignature({ tokenType , role: decoded.aud[0] }),
  });
  if (!payload?.sub) {
    throw BadExecuption("missing token payload");
  }
  if (await exists({key: userRevokrTokevKey({userId: payload.sub, jti:payload.jti})})) {
    throw UnauthorizedException("Expired login credentials");
  }
  const user = await findById({
    model: UserModel,
    id: payload.sub,
  });
  if (!user) {
    throw NotFoundExecuption("invalid user");
  }
  if ((user.changeCredentialTime?.getTime() ?? 0) > payload.iat *1000) {
    throw UnauthorizedException("Expired login credentials")
  }
  console.log({change: user.changeCredentialTime?.getTime(), iat: payload.iat *1000});
  
  return { user, payload };
};

export const createLoginCredentials = async ({
  user,
  issuer,
  options = {}
}) => {
  const { accessSignature, refreshSignature } = await getTokenSignatures({role:user.role});
  const jwtid = randomUUID()
  const access_token = await creatToken({
    payload:{sub: user._id},
    secret: accessSignature,
    options: {
      ...options,
      issuer,
      audience: [user.role],
      expiresIn: ACCESS_TOKEN_EXPIERS_IN,
      jwtid
    },
  });
  const refresh_token = await creatToken({
    payload:{sub: user._id},
    secret: refreshSignature,
    options: {
      ...options,
      issuer,
      audience: [user.role],
      expiresIn: REFRESH_TOKEN_EXPIERS_IN,
      jwtid
    },
    
  });
  console.log({accessSignature, refreshSignature});
  
  return { access_token, refresh_token };
};

export const creatRevokeToken = async (payload)=>{
  const consumedTime = (Math.ceil(Date.now() / 1000) - payload.iat);
    const refreshEpiresIn = payload.iat + REFRESH_TOKEN_EXPIERS_IN
    const ttl =  refreshEpiresIn - consumedTime
    console.log({payload, consumedTime , refreshEpiresIn , ttl});
    await set({key: userRevokrTokevKey({userId: payload.sub, jti:payload.jti}), value: payload.jti, ttl})
    return
}
export const createRevokeToken = creatRevokeToken;

export const basicAuth = async ({email, password}) =>{
      const account = await findOne({ 
      model:UserModel,
      filter:{
        email,
      },
      Options:{select :"password"}
    });
    if (!account) throw NotFoundExecuption("not exist")
    
      const match = await compare(password, account.password)
    
    if (!match) throw NotFoundExecuption("not exist")
    return account
}