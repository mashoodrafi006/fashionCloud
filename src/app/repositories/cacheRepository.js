import cache from '../../models/mongoModels/cache';
import { COLLECTION_LIMIT } from '../../constants/constants';
const cacheRepository = {};

/**
 * @param keyValuePair
 * @description Create or update the key value pair.
 */
cacheRepository.createKeyValuePair = async (keyValuePair) => {
    try {
        keyValuePair.expireAt = new Date();
        await cache.updateOne({ key: keyValuePair.key }, keyValuePair, { upsert: true });

    } catch (error) {
        throw error;
    }
}

/**
 * @param key
 * @description Delete cache using key.
 */
cacheRepository.deleteKey = async (key) => {
    try {
        await cache.deleteOne({ key });
    } catch (error) {
        throw error;
    }
}

/**
 * @description Truncate whole cache.
 */
cacheRepository.truncateCache = async () => {
    try {
        await cache.deleteMany();
    } catch (error) {
        throw error;
    }
}

/**
 * @param paginations object will include limit & offset.
 * @description Fetch all cached key value pairs.
 */
cacheRepository.fetchCache = async (paginations) => {
    try {
        const { limit, offset } = paginations;
        const keyValuePairs = await cache.find()
            .select('-_id key value')
            .skip(offset)
            .limit(limit)
            .lean();

        return keyValuePairs;
    } catch (error) {
        throw error;
    }
}


/**
 * @param key.
 * @description Find the value of cached key and update the TTL.
 */
cacheRepository.findCachedValue = async (key) => {
    try {
        let value = "";
        /* lean method is used to improve the performance of the read operation */
        let keyValuePair = await cache.findOne({ key }).select('-_id value').lean();
        if (keyValuePair !== null && keyValuePair.value.length) {
            value = keyValuePair.value;
            keyValuePair = {
                key,
                expireAt: new Date()
            }
            /* Set time in expiredAt*/
            cache.updateOne({ key: keyValuePair.key }, keyValuePair, { upsert: true });
        }
        return value;
    } catch (error) {
        throw error;
    }
}


cacheRepository.clearOldCache = async () => {
    try {
        const rows = await cache.countDocuments();
        const numberOfExtraDocuments = COLLECTION_LIMIT - rows;
        /*
        Get the count of documents exceeding collection limit.
        */
        if (numberOfExtraDocuments < 0) {
            const limit = -1 * (numberOfExtraDocuments);
            /* Find keys of oldest documents to delete from collection. */
            const keysToDelete = await cache.find({}).sort({ expireAt: 1 }).skip(0).limit(limit).select('key');
            let keysToDeleteList = [];
            keysToDelete.forEach(keys => {
                keysToDeleteList.push(keys.key);
            });
            await cache.deleteMany({ key: { $in: keysToDeleteList } });
        }

    } catch (error) {
        throw error;
    }
}

export default cacheRepository;