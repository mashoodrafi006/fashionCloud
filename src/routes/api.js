import express from 'express';
import CacheValidator from '../utils/validators/cacheValidator';
import CacheController from '../controllers/CacheController';

const router = express.Router({});

router.get('/key-value', CacheValidator.validateKey, CacheController.findKeyValuePair);
router.get('/', CacheValidator.fetchCacheValidator, CacheController.fetchCache);
router.post('/save', CacheValidator.validateKeyValuePair, CacheController.createKeyValuePair);
router.delete('/', CacheValidator.validateKey, CacheController.deleteKey);
router.delete('/all', CacheController.truncateCache);
router.delete('/clearCache', CacheController.clearCache);


module.exports = router;
