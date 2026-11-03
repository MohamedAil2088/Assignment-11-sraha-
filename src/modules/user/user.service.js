import jwt from "jsonwebtoken";
import {
  findById,
  findByIdAndUpdate,
} from "../../common/repository/base.respository/base.repository.js";
import { UserModel } from "../../DB/model/user.model.js";
import { verifyToken , creatToken, createLoginCredentials, userRevokrTokevKey, creatRevokeToken, userBaseRevokrTokevKey, userProfileKey } from "../../common/security/token.security.js";
import { ACCESS_TOKEN_EXPIERS_IN, REFRESH_TOKEN_EXPIERS_IN, REFRESH_ADMIN_TOKEN_SIGNATURE } from "../../config.js";
import { ConflictExecuption } from "../../common/execuptions/error.execuptions.js";
import { successResponse } from "../../common/utils/index.js";
import { del, keys, set, get } from "../../common/services/index.js";
import { LogoutEnum } from "../../enum/security.enum.js";
export const profile = async (account) => {
  const key = userProfileKey({ userId: account._id });

  const cachedProfile = await get({ key });
  if (cachedProfile) {
    console.log("⚡ Profile fetched from Redis Cache!");
    return cachedProfile;
  }

  console.log("🐢 Profile fetched from Database & saving to Cache...");
  const profileData = account.toObject ? account.toObject() : { ...account };
  delete profileData.password;
  await set({ key, value: profileData, ttl: 86400 });

  return account;
};

export const update = async (user, data) => {
  const account = await findByIdAndUpdate({
    model: UserModel,
    id: user._id,
    update: data,
  });

  const key = userProfileKey({ userId: user._id });
  const profileData = account.toObject ? account.toObject() : { ...account };
  delete profileData.password;
  await set({ key, value: profileData, ttl: 86400 });

  return account;
};

export const rotateToken = async (payload,user, issuer) => {
  const accessExpiresIn = (payload.iat + ACCESS_TOKEN_EXPIERS_IN) * 1000;
  const currentTime = Date.now() + (30 * 60000);
  if (currentTime < accessExpiresIn) {
    throw ConflictExecuption("Sorry we cannot new login credentials while current access token still within valid time range",
    );
  }
  const data = await createLoginCredentials({user , issuer})
  await creatRevokeToken(payload)
  return data
};

export const logout = async (payload, user, { action = LogoutEnum.DEVICE } = {}) => {
  console.log({ user, action, sub: payload.sub });
  
  switch (action) {
    case LogoutEnum.ALL:
      user.changeCredentialTime = new Date()
      await user.save()

      const tokenKeys = await keys({ prefix: userBaseRevokrTokevKey({ userId: payload.sub }) })
      console.log({ tokenKeys });
      if (tokenKeys.length > 0) {
        // await del({ key: tokenKeys })
        await del({key: await keys({prefix: userBaseRevokrTokevKey({userId: payload.sub})})})
      }
      break;

    default:
      await creatRevokeToken(payload)
      break;
  }
  
  return 
};
