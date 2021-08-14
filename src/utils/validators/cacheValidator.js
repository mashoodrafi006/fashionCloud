import { CONTROLLER_ERROR, INVALID_REQUEST } from '../../constants/errors';
export default class CacheValidator {
    /**
     * @param req
     * @param res
     * @param next
     */
    static async validateKeyValuePair(req, res, next) {
        try {
            const { key, value } = req.body;
            /*
                Validates that key, value are of type string.
            */
            if (typeof key === 'string' && typeof value === 'string') {
                next();
            } else {
                res.json(INVALID_REQUEST);
            }
        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }
    }


    /**
     * @param req
     * @param res
     * @param next
     */
    static async validateKey(req, res, next) {
        try {
            const { key } = req.body;
            /*
                Validates that key is of type string.
            */
            if (typeof key === 'string') {
                next();
            } else {
                res.json(INVALID_REQUEST);
            }
        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }
    }


    /**
 * @param req
 * @param res
 * @param next
 */
    static async fetchCacheValidator(req, res, next) {
        try {
            const { limit, offset } = req.query;
            /*
            Validate pagination parameters
            */
            if (isNaN(parseInt(offset)) && isNaN(parseInt(limit))) {
                req.query.offset = 0;
                req.query.limit = 10;
            } else {
                req.query.offset = parseInt(offset);
                req.query.limit = parseInt(limit);
            }

            next();
        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }
    }
}