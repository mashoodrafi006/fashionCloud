import cacheRepository from "../repositories/cacheRepository";
const cacheService = {};

cacheService.createKey = async (keyValuePair) => {
    try {
        await cacheRepository.createKeyValuePair(keyValuePair);
    } catch (error) {
        throw error;
    }
}

cacheService.deleteKey = async (key) => {
    try {
        await cacheRepository.deleteKey(key);
    } catch (error) {
        throw error;
    }
}

cacheService.truncateCache = async () => {
    try {
        await cacheRepository.truncateCache();
    } catch (error) {
        throw error;
    }
}

cacheService.fetchCache = async (pagination) => {
    try {
        return await cacheRepository.fetchCache(pagination);
    } catch (error) {
        throw error;
    }
}

cacheService.findKeyValuePair = async (key) => {
    try {
        const foundCachedValue = await cacheRepository.findCachedValue(key);
        const cachedValue = cacheService.logOutPut(foundCachedValue);
        if(!foundCachedValue.length){
            cacheRepository.createKeyValuePair({key, value: cachedValue});
        }
        return {key: key, value: cachedValue};
    } catch (error) {
        throw error;
    }
}

cacheService.clearCache = async () => {
    try {
        await cacheRepository.clearOldCache();
    } catch (error) {
        throw error;
    }
}

cacheService.createRandomString = () => {
    try {
        return (Math.random() + 1).toString(36).substring(7);
    } catch (error) {
        throw error;
    }
}

cacheService.logOutPut = (value) => {
    try {
        let keyValue = value;
        if(value.length){
            console.log("Cache hit.");
        }else{
            console.log("Cache miss.");
            keyValue = cacheService.createRandomString();
        }
        return keyValue;
    } catch (error) {
        throw error;
    }
}

export default cacheService;