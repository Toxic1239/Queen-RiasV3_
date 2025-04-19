const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Cmania",
    ownerNumber: process.env.OWNER_NUMBER || "27695673310",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "South Africa",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Gauteng",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0ZYYVBua0RDdmZtM3pHMEtlb29FTm54Vi93dzk0MWtscStzRVpvWWdrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZHFvSWxiNXBOTzN5dEF1Vlg5eFhNd3lHQnR2d001bGpMSTJSVk1JTGxDMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRjNDYW93Nzl0VTdlZ2R4Nzh4alBtV0xndXFMWk5kQ0ZnWEpYbCtoKzBBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQdE1JclBveWlmc3NQMk5HUmwydUpKT0NMY3hxMVg2cnpKUEl2YVdqTG1vPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdDRUtOVWpBMmxQbUo2cllFY2xLQTVNWTFYMTYvQmUvU1RhRHIyRGEzWFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVwcHc3TkxqUFgzN0FOd2V0eVY1VFRFVXhMY2VtblBnV2VkZjVqUnNHaFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0VjNXAwd0dQdmpMODlDUlpxU1FFRzROS3N0UnNaeVZLV2xTbzk2VHNHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1hlcFNwUVE4WjVQWllSQWxtYTByYnV1cEdOdzZPLzBLVGVKMVJxUFFEYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlJa0l6a3Z5MDg2SnV2K3FVTDBUckRzR0d2Q3JXSWlzYVZuSHNYRWg1Vm8wb0xhcnRCa21qc1R4a29BSnBQb08rRGVmNSsrZ29TVlIzRFVtZHJxekRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU1LCJhZHZTZWNyZXRLZXkiOiI3cWZNcXBhUFhiVnNnc0hGTVY0ZnBrdTZ2ZUMzZ0E2MTVzOGRNZ0NjT0RvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJDUkpENTdFOCIsIm1lIjp7ImlkIjoiMjc2OTU2NzMzMTA6MTFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSHViQ21hbmlhIiwibGlkIjoiNTAwODgxOTM4MjI5MzA6MTFAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJU0p6dVFIRUl2RmpjQUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIxT0NvanpmT0xLeDJBU0pYQ1ozbWYvWEdKaWk1WmN6Z0hVNTJ6MmlWT0NZPSIsImFjY291bnRTaWduYXR1cmUiOiJCTGQwbFRubkhlaFhZdW9aTXZVNHgyK1R0dTlEWk10bGJ0N2ZUekFDVGNLR2FhRkJCaldTSWdhRmZPZ3J0QmFEMFUzYlZNcm1CbzFMblZ5SDc3NE1Ddz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaTB6ZExFMTZMaU5yYXhKaG1PYzlCRDRON2loTkdCQUNVbmlpV3JGUURsOGFzNGxCWmw1V0hMSEFXb3M4cXVpSHhxZTFUdEhaRkhLOEZxdGdkbUJDQUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzY5NTY3MzMxMDoxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkVGdxSTgzeml5c2RnRWlWd21kNW4vMXhpWW91V1hNNEIxT2RzOW9sVGdtIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDUwNTIzMTIsImxhc3RQcm9wSGFzaCI6IjNSOVozOSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRmRQIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
