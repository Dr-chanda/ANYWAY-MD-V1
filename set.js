const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib05jaU5PenlNbjNTM2NUTDJ2THlFMnFoYURaNlQzcE5GQkRjMTJCKzgxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2lnVkV0b25MMGIram5heG5zVllUNVdWR3JhNkZtZlZ1TlMwc3c3NUZVTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnQ2JNT29ob05vYWtvUWxrTzZrWDFOYk9SS3Q1NlVDcldCSjJxaHhWQzJ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYZS9sQlB5QVpab0VhZEZmd3Q3N0VYZ214Y3JEeENlRWpPMHIzRkZCNFJjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitQemV5YzJtNDFQNnZacy9DRGV4cmc5Q0t4bEJOM3JmempSY0dSaEZXbm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJsaFBZbC95Q2pPU0ptMjJtaTZSa2dMckRsREJkYlk0dGlVTWxhcGdNQ1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib05MWHJnVmVPZFlvNzRrSGcvTWV6RGgzTVh5MFQydStOTGQzTC9IUkMxZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEF2R2VtZVNUMVBsVXhJdUdTYlBrUGI0ckNQUi85eldUM25MOFNHZ0ttND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijh0VHpWZzFxNHVQZTQxNWZneUttNzhMZWVpNUFiN3I0dWxmek1DUXoxNTNUcUJKRjhkVU9uQkpIc3VoNFB6a2tlS1lRVThzdnA1UUR0aDhVRW5PUWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MiwiYWR2U2VjcmV0S2V5IjoiNlFqbjZRUUFkR0xBTjc5c2lZV0wrWkZzU2cxbkc1dzAwc2Zla002VFZOaz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiWUx2M3RqY2ZTYUtXRjdMTHZfTFVzQSIsInBob25lSWQiOiIwNDUzZTZmNi1kZWRkLTQ1OTUtYmY3ZC04ZDE4YjU1OTRkYjIiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidnpUUmtqNGFtK3crRVFPQ3lQQ09lQ1BKeGNrPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkU2MUx2bGZGKzRpbTkzRm9OVWpPYWxTcEdJND0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJKRVlGVEFUUiIsIm1lIjp7ImlkIjoiMjc3ODE2NzMwMjI6OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLDikFCIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPVEJ2SjRERUp6YitMMEdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJIYjZkeHMxdkhkMmNEZ3BKRDZaVXhRZDErY2ZFTmpHdFVyNjVJTXlGcVhJPSIsImFjY291bnRTaWduYXR1cmUiOiIvb3p5SUdIeENFQ240YkxSdHNQcHIwYi9CN0xHUVYvM1JyTXo5bXl6TVBjeEhaUEVTVW1kNDYrNS9PSy9CNnl4a1VNZm5BNEFjRy9Jb0U0eVN5M1pCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoicVVYemR4RElBWWYzVTZxaXpJNmdKS09JUEJWb21zUGRTZXZhWnMxelltVTdVL0szUTBqTWlsd05ZVEZCU2ltVFg4aTdSNk9IVnVBa2pWbkhITDJaZ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzc4MTY3MzAyMjo5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlIyK25jYk5ieDNkbkE0S1NRK21WTVVIZGZuSHhEWXhyVksrdVNETWhhbHkifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDA1MTY3NzgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTDBZIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Dr chanda",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27781673022",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'DrChanda',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
                  ANTIDELETE2 : process.env.ANTIDELETE2 || "yes",
                  ANTIDELETE1 : process.env.ANTIDELETE1 || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
