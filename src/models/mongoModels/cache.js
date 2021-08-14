import mongoose from 'mongoose';

const Cache = mongoose.Schema(
    {
        key: {
            type: String, required: true
        },
        value: {
            type: String, required: true
        },
        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: '180m' },
        }
    },
    { strict: false },
    { timestamps: true }
)

/* Collection is indexed. */
Cache.index({ key: 1 });
Cache.index({ value: 1 });

export default mongoose.model('cache', Cache);
