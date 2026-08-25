import * as z from 'zod';

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const nameSchema = z.string()
    .min(6, "Name must be at least 6 characters")
    .max(32, "Name must be at most 32 characters")
    .regex(/^[a-zA-Z\s\-'.]+$/, "Full name can only contain letters, spaces, hyphens, and apostrophes")
    .transform(val => val.trim())
    .refine(
        (val) => {
            // Check for at least two words, each starting with an uppercase letter
            // or containing only alphabetic characters/spaces/hyphens/apostrophes
            const namePattern = /^[a-zA-ZÀ-ÿ]+([ \-'][a-zA-ZÀ-ÿ]+)*$/;
            const hasTwoParts = val.split(/\s+/).filter(part => part.length > 0).length >= 2;
            return namePattern.test(val) && hasTwoParts;
        },
        { message: 'Please enter both a first and last name (e.g., John Doe)' }
    )
    .refine(
        (val) => !/^\s|\s$/.test(val),
        { message: 'Name should not have leading or trailing spaces' }
    )

const signUpSchema = z.object({
    fullName: nameSchema,  // Must have first and last name
    email: z.email(),
    password: passwordSchema,
    repeatPassword: passwordSchema
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
});

export { signUpSchema }