import {z} from "zod"

export const usernameValidation = z
    .string()
    .min(2,"USername must be atleast 2 chars")
    .max(20,"Username should be max 20 chars")
    .regex(/^[a-zA-Z0-9_]+$/,"Username should not have special char")



export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(8,{message:"password must me min 8 chars"}).max(16,{message:"password cannot be longer than 16 chars"})
})