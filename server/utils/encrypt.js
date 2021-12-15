const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async password => {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log(`encrypt Error > ${err}`);
                reject(false);
            }
            resolve(hash);
        });
    });
    return hashedPassword;
};

const comparePassword = async (password, hashPassword) => {
    const comparedPassword = await new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, (err, res) => {
            if (err) {
                console.log(`encrypt Error > ${err}`);
                resolve(0)
            }
            resolve(res);
        });
    });
    return comparedPassword;
};

module.exports = {
    hashPassword,
    comparePassword
};
