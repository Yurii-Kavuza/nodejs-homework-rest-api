// const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res) =>{
    const { _id } = req.user;
    const {path: tempUpload, originalname}=req.file;
    const imageName = `${_id}_${+new Date()}_${originalname}`;
    try {    
        // resize
        const image = await jimp.read(tempUpload);
        await image.resize(250,250);
        await image.writeAsync(tempUpload);

        // move
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public/avatars", imageName);
        await User.findByIdAndUpdate(_id, {avatarURL});
        res.json({avatarURL})
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
}

module.exports = updateAvatar;
