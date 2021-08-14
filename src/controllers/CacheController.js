import logger from '../utils/logger';
import { codeCrashResponse } from '../utils/utils';
import { API_STATUS_CODES, RESPONSE_MESSAGES } from '../constants/constants';
import cacheService from '../app/services/cacheService';

const CacheController = {};

CacheController.createKeyValuePair = async (req, res) => {
    try {
        const { key, value } = req.body;
        await cacheService.createKey({ key, value });

        let response = CacheController.prepareResponseBack([]);
        return res.json(response);
    } catch (error) {
        if (error.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
            return res.json({ status: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
        }
        logger.log({
            level: 'error',
            message: error.message,
        });
        return codeCrashResponse(res, error);
    }
}

CacheController.deleteKey = async (req, res) => {
    try {
        const { key } = req.body;
        await cacheService.deleteKey(key);

        let response = CacheController.prepareResponseBack([]);
        return res.json(response);
    } catch (error) {
        logger.log({
            level: 'error',
            message: error.message,
        });
        return codeCrashResponse(res, error);
    }
}

CacheController.truncateCache = async (req, res) => {
    try {
        await cacheService.truncateCache();

        let response = CacheController.prepareResponseBack([]);
        return res.json(response);
    } catch (error) {
        logger.log({
            level: 'error',
            message: error.message,
        });
        return codeCrashResponse(res, error);
    }
}

CacheController.fetchCache = async (req, res) => {
    try {
        const { limit, offset } = req.query;
        const cache = await cacheService.fetchCache({ limit, offset });

        let response = CacheController.prepareResponseBack(cache);
        return res.json(response);
    } catch (error) {
        logger.log({
            level: 'error',
            message: error.message,
        });
        return codeCrashResponse(res, error);
    }
}


CacheController.findKeyValuePair = async (req, res) => {
    try {
        const { key } = req.body;
        const cachedValue = await cacheService.findKeyValuePair(key);

        let response = CacheController.prepareResponseBack(cachedValue);
        return res.json(response);
    } catch (error) {
        logger.log({
            level: 'error',
            message: error.message,
        });
        return codeCrashResponse(res, error);
    }
}


CacheController.clearCache = async (req, res) => {
    try {
        await cacheService.clearCache();

        let response = CacheController.prepareResponseBack([]);
        return res.json(response);
    } catch (error) {
        logger.log({
            level: 'error',
            message: error.message,
        });
        return codeCrashResponse(res, error);
    }
}



CacheController.prepareResponseBack = (entities) => {
    try {
        let response = {};
        response.status = API_STATUS_CODES.SUCCESS;
        response.message = RESPONSE_MESSAGES.SUCCESS;
        response.body = entities;
        return response;
    } catch (error) {
        logger.log({
            level: 'error',
            message: error.message,
        });
        throw error;
    }
};

export default CacheController;