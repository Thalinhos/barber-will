import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPass = async (passwordToBeHashed) =>{
    const hashed = await bcrypt.hash(passwordToBeHashed, saltRounds);
    return hashed
} 
