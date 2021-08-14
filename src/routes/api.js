import express from 'express';
import CacheValidator from '../utils/validators/cacheValidator';
import CacheController from '../controllers/CacheController';

const router = express.Router({});


/* Endpoint that will create random string as value to key on cache miss and fetch the value on cache hit. */
router.get('/key-value', CacheValidator.validateKey, CacheController.findKeyValuePair);

/* Endpoint that will retrieve all the cached key value pairs. */
router.get('/', CacheValidator.fetchCacheValidator, CacheController.fetchCache);

/* Endpoint that will either create or update the cached key value pair. */
router.post('/save', CacheValidator.validateKeyValuePair, CacheController.createKeyValuePair);

/* Endpoint that will delete the key value pair in cache. */
router.delete('/', CacheValidator.validateKey, CacheController.deleteKey);

/* Endpoint that will truncate all cache. */
router.delete('/all', CacheController.truncateCache);

/* Endpoint that will clear older cache when collection documents number limit is reached. */
router.delete('/clearCache', CacheController.clearCache);

module.exports = router;
