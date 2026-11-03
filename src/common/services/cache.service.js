import { client } from "../../DB/redis.connection.js";

export const set = async ({key , value, ttl = undefined}) => {
    
    if(typeof value == "object"){
    value = JSON.stringify(value)  
    }
    return await client.set(key, value, { EX: ttl });
};

export const get = async ({key}) => {
    let value = await client.get(key);
    try {
        return JSON.parse(value)
    } catch (error) {
        return value 
    }
    
};

export const exists = async ({key}) => {
    return await client.exists(key);
};

export const update = async ({key , value, ttl = undefined}) => {
    
    if(!await exists({key})){
    return 0 
    }
    return await set({key ,value , ttl})
};

export const del = async ({key}) => {
    return await client.del(key)
};

export const keys = async ({prefix}) => {
    return await client.keys(`${prefix}*`)
};

export const ttl = async ({key}) => {
    return await client.ttl(key)
};

export const expire = async ({key , ttl}) => {
    return await client.expire(key , ttl)
};

// INCREMENT / DECREMENT

export const incr = async ({key}) => {
    return await client.incr(key);
};

export const decr = async ({key}) => {
    return await client.decr(key);
};

export const incrBy = async ({key , value = 1}) => {
    return await client.incrBy(key , value);
};

export const decrBy = async ({key , value}) => {
    return await client.decrBy(key , value);
};

// HASH

export const hSet = async ({key , field , value}) => {
    if(typeof value == "object"){
    value = JSON.stringify(value)  
    }
    return await client.hSet(key , field , value);
};

export const hGet = async ({key , field}) => {
    let value = await client.hGet(key , field);
    try {
        return JSON.parse(value)
    } catch (error) {
        return value 
    }
};

export const hGetAll = async ({key}) => {
    return await client.hGetAll(key);
};

export const hDel = async ({key , field}) => {
    return await client.hDel(key , field);
};

export const hExists = async ({key , field}) => {
    return await client.hExists(key , field);
};

// MULTIPLE SET / GET

export const mSet = async ({entries}) => {
    return await client.mSet(entries);
};

export const mGet = async ({keys}) => {
    return await client.mGet(keys);
};

// LIST

export const lPush = async ({key , value}) => {
    if(typeof value == "object"){
    value = JSON.stringify(value)  
    }
    return await client.lPush(key , value);
};

export const rPush = async ({key , value}) => {
    if(typeof value == "object"){
    value = JSON.stringify(value)  
    }
    return await client.rPush(key , value);
};

export const lPop = async ({key}) => {
    let value = await client.lPop(key);
    try {
        return JSON.parse(value)
    } catch (error) {
        return value 
    }
};

export const rPop = async ({key}) => {
    let value = await client.rPop(key);
    try {
        return JSON.parse(value)
    } catch (error) {
        return value 
    }
};

export const lRange = async ({key , start , stop}) => {
    return await client.lRange(key , start , stop);
};

export const lLen = async ({key}) => {
    return await client.lLen(key);
};

// SET

export const sAdd = async ({key , value}) => {
    return await client.sAdd(key , value);
};

export const sMembers = async ({key}) => {
    return await client.sMembers(key);
};

export const sRem = async ({key , value}) => {
    return await client.sRem(key , value);
};

export const sIsMember = async ({key , value}) => {
    return await client.sIsMember(key , value);
};

export const sCard = async ({key}) => {
    return await client.sCard(key);
};

// SORTED SET (ZSET)

export const zAdd = async ({key , score , value}) => {
    return await client.zAdd(key , { score , value });
};

export const zRem = async ({key , value}) => {
    return await client.zRem(key , value);
};

export const zScore = async ({key , value}) => {
    return await client.zScore(key , value);
};

export const zRank = async ({key , value}) => {
    return await client.zRank(key , value);
};

export const zRange = async ({key , start , stop}) => {
    return await client.zRange(key , start , stop);
};

export const zCard = async ({key}) => {
    return await client.zCard(key);
};

// KEY MANAGEMENT

export const type = async ({key}) => {
    return await client.type(key);
};

export const rename = async ({key , newKey}) => {
    return await client.rename(key , newKey);
};

export const persist = async ({key}) => {
    return await client.persist(key);
};

export const randomKey = async () => {
    return await client.randomKey();
};