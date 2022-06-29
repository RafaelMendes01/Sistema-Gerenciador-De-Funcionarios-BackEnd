import * as bcrypt from 'bcrypt';

export async function encodePassWord(rawpassword: String){
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hash(Buffer.from(rawpassword), SALT);
}