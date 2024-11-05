import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const envPath = path.resolve(import.meta.dirname, '.env');
const secretKey = crypto.randomBytes(64).toString('hex');

const updateEnvFile = () => 
{
    if(fs.existsSync(envPath))
    {
        const envFileContent = fs.readFileSync(envPath, 'utf-8');
        
        if(!envFileContent.includes('JWT_SECRET_KEY')) 
        {
            fs.appendFileSync(envPath, `\nJWT_SECRET_KEY=${secretKey}\n`);
        }
    }
};

updateEnvFile();