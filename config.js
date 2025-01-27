const fs = require("fs"); 
require("dotenv").config();

module.exports = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "LOSER-007",
    ownerNumber: process.env.OWNER_NUMBER || "923251039272",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "LOSER",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "LOSER",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ === "true",
    autoViewStatus: process.env.AUTO_VIEW_STATUS === "true",
    autoReact: process.env.AUTO_REACT === "true",
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU1FSS92MzBheWlOVitGektIZi9EUU5SSlBGeWl0RnVmWDFjN0QyT1dFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRENETzdxeUJhczVSeVYyWGN4ai9RRkx5eGFwVlNWYkV4T1hvUE1DZlJFMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTSXM5YUx0YWI2T1NMQUpkT0IyaEtCUWp4VkMzbG5MU3ZNSzR0eXdielc4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1RGhUUnROc1NvK0lBZTJWc3JZdzFJMURPZkdXdkR2ZlBBUEU5TU0rcVhBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFFa3Z1UlB2RnZXNGxCYlliK2RwcnJtREZnenNha2hkMDlzLzhwZGdoV2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlXcTVONG9LenV4VTFDTFZTcDljMzkwQ2tlckJPbm5OYlhGTGthbUlNeUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkRROFNtWi9PNlZpZWZWTEZ2dVE1ZlV3MEVGUGRZdS9sWkx5MDB1d2NrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1cwRXlLRmtSdjdzTVpGei92OEhvRVZpeDRLY3pObDVpOHJsQlEzS2dnRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IngwVnZad0JkdzljZU5kY1pmQ2p1d3ZZQzBMZ3VkT09qclBPTmFyVFZBT2tzY2hIY3hVT2N1MnJsdUFBN3BjcEZUbVJFZFNscGxDWmxEdFNjTnYxR2dnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDQsImFkdlNlY3JldEtleSI6IjB2NXY5VHMxcEw2bmtrN0dZbmY3Vml3Zjd5clFtSEpwMXpicFM1V1NpY2M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkVTVjZIMTFKIiwibWUiOnsiaWQiOiI5MjMyNTEwMzkyNzI6M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLlvaEg8J2Qi/CdkI7wnZCS8J2QhPCdkJEt4oGw4oGw4oG344ODIFxu8JKGmVxu8JKGmVxu8JKGmVxu8JKGmVxu8JKGmVxu8JKGmVxu8JKGmVxu8JKGmVxuIPCThqnwk4Ou8JOGqlxuIPCdka/wnZGi8J2Rn/CdkZ/wnZGO8J2RlvCdkZ/wnZGO44ODIiwibGlkIjoiMjA5MTA1MzgxNzczNTU1OjNAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNcUprVmNRajVIZHZBWVlDQ0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJpbEFBZWcvYUtjaUR0Tml3UUNrSFNTdThpVG1RMmRld3IyeUlaMi9KWjJZPSIsImFjY291bnRTaWduYXR1cmUiOiJpS29GakFPN2pQUmhHRXVBMFNxR1FJUlA1NURjaWUrbk5CVFZTUEx4bVJHTkRyQlhtL3JYVHVsZ3JRdTdtNzJ6d3JhazU2Y3VBU2tPWjloN21uZElEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSUtYYnBPZHFUMDJEMW9ITE5UY0gvT3drUlk4NkhHM2cvaUErb3ZjNytpa21JaXdrRk1lYTIyb0MwTjJWdVBZRUk3MjV6Vk5JWnJZMTMxMjVpTFg1alE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMyNTEwMzkyNzI6M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZcFFBSG9QMmluSWc3VFlzRUFwQjBrcnZJazVrTm5Yc0s5c2lHZHZ5V2RtIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzc5Njc3NzMsImxhc3RQcm9wSGFzaCI6IjNSOVozOSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT3cwIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED || "true",
};

let file = require.resolve(__filename); 
fs.watchFile(file, () => {
    fs.unwatchFile(file); 
    console.log(`Update '${__filename}'`); 
    delete require.cache[file];
    require(file); 
});
