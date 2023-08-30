import mongoose from 'mongoose'
import { boolean, string } from 'zod';

const userSchema = new mongoose.Schema({
    id: { type: 'string', required: true },
    username: { type: 'string', required: true, unique: true },
    name: { type: 'string', required: true },
    image: { type: 'string', required: false},
    bio: { type: 'string', required: false},
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    onboarded: { type:'boolean', required: true},
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]
})

const User = mongoose.models.User || mongoose.model('User',userSchema)

export default User 