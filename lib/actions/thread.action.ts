"use server"

import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { connectToDB } from "../mongoose"

interface params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}

export async function createThread({ text, author, communityId, path }: params) {
    try {
        connectToDB()

        const createdThread = await Thread.create({
            text,
            author,
            communityId: null,
        })

        //update user 
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        })

        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Error creating thread ${error.message}`);

    }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {

    try {
        connectToDB()

        const skipAmount = (pageNumber - 1) * pageSize

        const postQuery = Thread.find({ parentId: { $in: [null, undefined] } })
            .sort({createAt: 'desc'})
            .skip(skipAmount)
            .limit(pageSize)
            .populate({ path:'author', model: User})
            .populate({
                path: 'children',
                populate:{
                    path: 'author',
                    model: User,
                    select: '_id name parentId image'
                }
            })

    const totalPostCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } })

    const posts = await postQuery.exec()

    const isNext = totalPostCount > skipAmount + posts.length

    return { posts, isNext}

    } catch (error: any) {
        throw new Error(`Error fetching posts: ${error.message}`);
    }

}