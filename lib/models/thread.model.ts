import mongoose from 'mongoose'
import { boolean, string } from 'zod';

const threadSchema = new mongoose.Schema({
    text: { type: 'string', required: true },
    author: { type: 'string', required: true },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'community'
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    parentId: { type: 'string', required: false },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ]
})

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema)

export default Thread 