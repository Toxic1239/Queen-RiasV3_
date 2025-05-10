const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0RFd3NTOGovM1pyYjh2S1E1K3k4Mm4yL2VyKzhLU0ZRdTBUeGhkZExVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRnczaXBqUXpsS0I1TVNZZEh6UDZtcEg1RkVHTE9BR1RMdzh3L3ZEYmNtOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPRXVPaGVpZDhaWVVmTDZZdkJUQ0ZHZUc0YlpPQ1VtbVBJNWhzUmZzdDJ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1aGV2QW1oSHJNdUs2aG12eEdudTMzY1ZOTmZCNS84WGRCbG1RR3hOcHhVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndIODIyUG1KWS9FWGZxNFJwWnE3S3E2RWlMa3pEVWYvVjl4S1FlRjlMRnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxKOHZHOElHRjA0dWRtK1RzQ3QrRFhHRjZzcU9XdHZkNnVEWG56bmhBWEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkVoQXRUcURMSkp1ZkVNL1NXdkN5SnR2Mk5qaldlcmY5MHpVbmlTQ0NIWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVU1NUtHc3lZTjlySU9XWjYxSUlVcldoWFFmN29PSnB1WGN1cU5vUjhnbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im15cG5zanJ0d1UrTndXZ1lKd1FOU2xhRER0ZGVkTGVubHhMNHI2QldONnF4VWMwbzdWNVZ1anhiaktkV3pJVWRTM2VpNTBGZVJZdk1ZODQydmttUkRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY5LCJhZHZTZWNyZXRLZXkiOiJ2ZzRKNHM1Zklnd0I5MldzYjNnZ1hLRkFsTWNpbEJxTzJGTjdCM25TV2pzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzI3NjI1NDM3N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNDU5NkRDMkMxRTJFMjkyRTIxQTlGNUEwQTE5Rjk4RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ0MDkzNDU3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMyNzYyNTQzNzdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNDQ0Mjg4RUUzNEJDMjE4RTEzQjRERjRFN0Y4MUU0MDcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NDA5MzQ1N30seyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMjc2MjU0Mzc3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjIyRkRFMTNBRjRGNTI1M0Y1NzdBOTNFOUNDNEUzODI0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDQwOTM0NTh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzI3NjI1NDM3N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCQjVENDE1QkU4RDZBOEVCQjAyNkUzMDdFMUQ5OThBOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ0MDkzNDU5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMyNzYyNTQzNzdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOEI2NEU2MDZBNTA1MEJFRENEMzJFMUIyM0U3REIxNTQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NDA5MzQ2MH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMVA5TUpWNU0iLCJtZSI6eyJpZCI6IjkyMzI3NjI1NDM3NzozNUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI1NTczOTk2ODkyNTcxNDozNUBsaWQiLCJuYW1lIjoiQWJ1IFN1ZnlhbiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSkM0MXZVRkVJS0MwNzhHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWDZQbWdKNHVoUElNUlB4OFhxUjV2ejU1LzVtT1FZUi83cGRQOUZDR3JGcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNkZBK3JBOHZqUzlkM1lCeXNlaC9oaGxsWHZzei9Tb0ZlZWk3dzdUSmxqRWVKK1BFcVU5N3M5YS8xKzgzbjVsdVFYMlNYV0dQcmhLdEhYQzFYelUwQmc9PSIsImRldmljZVNpZ25hdHVyZSI6ImlpZXZTN05qOEVNK0p5Z3lybVE3NlpOUUZSWEt2cnl1aGM1ZVVCaGpWOXRpdkpzeFBiRk8yTnEwdEY4RVV0Rnd5d0hDYjNxeXhJTEpoWmdiK0hlZkFRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMjc2MjU0Mzc3OjM1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlYrajVvQ2VMb1R5REVUOGZGNmtlYjgrZWYrWmprR0VmKzZYVC9SUWhxeGIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NDA5MzQ1NCwibGFzdFByb3BIYXNoIjoiMUs0aEg0IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEVFYifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
