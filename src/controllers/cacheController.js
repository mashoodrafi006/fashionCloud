import logger from '../utils/logger';
import { codeCrashResponse } from '../utils/utils';
import { API_STATUS_CODES, RESPONSE_MESSAGES } from '../constants/constants';

const CacheController = {};

CacheController.createKey = async (req, res) =>{
    try {
        
    } catch (error) {
        logger.log({
            level: 'error',
            message: error.message,
        });
        return codeCrashResponse(res, error);
    }
}
export default CacheController;