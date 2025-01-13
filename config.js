require("dotenv").config(); // Load environment variables

module.exports = {
    prefix: process.env.PREFIX || ".", // Command prefix

    ownerName: process.env.OWNER_NAME || "ŠĂMÜÈŁ�(BATMAN🧍‍♂️)", // Owner name

    ownerNumber: process.env.OWNER_NUMBER || "+2349169577265", // Your WhatsApp number

    sudo: process.env.SUDO ? process.env.SUDO.split(",") : ["+2349169577265"," +2349169577265"], // People Who can use the bot even in Private mode

    mode: process.env.MODE || "private", // Bot mode: 'public' or 'private'

    region: process.env.REGION || "Nigeria", // Region

    botName: process.env.BOT_NAME || "Rias Gremory V3", // Bot name

    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES", // Sticker pack name

    exifAuthor: process.env.EXIF_AUTHOR || "ŠĂMÜÈŁ�(BATMAN🧍‍♂️)", // Author of the sticker pack

    timeZone: process.env.TIME_ZONE || "Africa/Lagos", // Time zone

    presenceStatus: process.env.PRESENCE_STATUS || "recording", // Bot presence status

    autoRead: process.env.AUTO_READ === "true", // Auto-read messages (true or false)

    autoViewStatus: process.env.AUTO_VIEW_STATUS === "true", // Auto-view statuses (true or false)

    autoReact: process.env.AUTO_REACT === "true", // Auto-react (true or false)

    sessionId: process.env.SESSION_ID || "", // Add Your Session ID here

    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED === "true", // Auto-reject calls feature (true or false)
};
