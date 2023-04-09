import jwt from 'jsonwebtoken';

const SignToken = async (email) => {
    const token = jwt.sign({ id: email }, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '1d' });
    return token
}

export default SignToken;