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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0Y4TldWVERVOTE1Q1o5ZDdBajhWK2lLSWM2UFJKTGpBeVZHWWhBSHhIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZG1SeENLWDBGS0xRUHR6bGhmTWk4dURJUE1ONElmSDAzY09wQVZXdmxGST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQ21VbjNDekRPUGs3dXQ0TGQrSU4zQkkvVTdSTG1YZjg2cmFHb2J6c1ZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjbHA0WHhJWmFJYVV1VWM3QkI0MVF0ZUJVL2ZKMXZkdG9aaVNTdGlPYmxJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1ETjQyRXV4VFF1ZjgrL2xmN0NGWTJuZWRzcnNZZW0zc0lLUEl5eFhXVUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJpem8xdEJkbzhZYys2MW45Z2plNzJlVlRNd3VPRXJlNi94cEZ4N1YrUjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0dxTjR1Q3A2Uk5FK25RdGluajI1Wm9aSWMyd1pWMis4VkNkeGIxaGQyaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidng4RlNDU1cwS05PRHNzYXA5elJPWGFZbnlWNWtuWnJ2YUpra1NIcXdRZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFvay85eVV0SmNlNVhiNXk5Y0Rjdlp1cVUzZE5PcG1jKzN1NTZ2TUhSMWFYRDllMDJqaTJXZWkyL1lhZ0ljWWJyMVo2MEZaZnVYYlpqa2xrNTVUNmdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM5LCJhZHZTZWNyZXRLZXkiOiJkdXB5YnphNW04eFhVcDl6T0RRYUFuZ3YwVDd1cDhzUHRtZHVCeCtIek9rPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDExNDc2NTQwMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3RDk4MjJBOTA4OUZEMEYyRTdDNTkzMUNDRDE0MkE2RSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQzNDk2NDMxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQxMTQ3NjU0MDFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzBGQkY3ODU1N0RFQjhFMDQ1RDVBNDk1RDU2MDFDM0QifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MzQ5NjQzMn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0MTE0NzY1NDAxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjZGNzUyNTA5QzMxOEQ3M0I2QTg0NkVDNDFCRjUzNzQwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDM0OTY0MzN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDExNDc2NTQwMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0OTAzMjQ0MjlEOUNEOEQ3MTgxMjI5QjA4MjY4QTY5RSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQzNDk2NDMzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQxMTQ3NjU0MDFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiN0Q1QzFDMzQ5RDYyQzRGRUU1MTY4OTJDNDg0MTlFRTUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MzQ5NjQzNH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiTldTQjVOWFciLCJtZSI6eyJpZCI6IjI1NDExNDc2NTQwMToyMUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI1NDc1NjQ4ODUxNTcyMToyMUBsaWQiLCJuYW1lIjoiLiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT3VkdHBRR0VPREpycjhHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSXZqSlE0TWNkdnQ4V3dOMlpzVjR2Y0NtaTFOODREM1ZrbkdDblFNY09nRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiS2p4QWw4M2VPdHUySVlFUStHbllZU2IxYnlFc2xxQTBCeHRPRzBrNGFwcHp5N25ubkdlWnpQSkgza1ZGU0ptRHdVZGpmYzMxUURxZzhVcEhlWStIQnc9PSIsImRldmljZVNpZ25hdHVyZSI6ImZMK2IzQUdQWVZjRzhLY3RNbldWSzBvalpUQWFSTStGT1hGMEVPU1lqeHlhSjdCQ3VmS1lVWWRRNFRBL1lEZzIxR0hUMk00bVJSajRSdmFtbURPYWpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0MTE0NzY1NDAxOjIxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNMNHlVT0RISGI3ZkZzRGRtYkZlTDNBcG90VGZPQTkxWkp4Z3AwREhEb0IifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MzQ5NjQyOSwibGFzdFByb3BIYXNoIjoiMlY3N3FVIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBRFQifQ==",
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
