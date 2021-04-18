import * as bcrypt from 'bcryptjs'

export async function HashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function ComparePassword(password: string, hashedPassword: string): Promise<string> {
    return await bcrypt.compare(password, hashedPassword);
}