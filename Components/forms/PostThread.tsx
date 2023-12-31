"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.action";

function PostThread({ userId } : {userId: string} ) {
    const pathname = usePathname();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: "",
            accountId: userId,
        },
    });

    const onSubmit = async(values: z.infer<typeof ThreadValidation>) =>{
        
        await createThread({
            text: values.thread,
            author: userId,
            communityId: null,
            path: pathname
        })

        router.push('/')
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-10 flex flex-col gap-10 justify-start"
            >
                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                            {/* className="no-focus border border-dark-4 bg-dark-3 text-light-1" */}
                            <FormControl>
                                <Textarea
                                    rows={15}
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-primary-500">Submit</Button>

            </form>
        </Form>
    );
}

export default PostThread;
