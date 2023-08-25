let userWalletAddress = null;
let targetWalletAddress = null;
let sendingSol = null;

export const setTargetWalletAddress = (qrCode) => {
    targetWalletAddress = (qrCode.split('-'))[0]
}

export const setUserWalletAddress = (address) => {
    userWalletAddress = address;
};


export const getTargetWalletAddress = () => {
    console.log(targetWalletAddress)
    return targetWalletAddress;
}

export const getUserWalletAddress = () => {
    // console.log(userWalletAddress)
    return userWalletAddress;
};

export const setSendingSol = (qrCode) => {
    sendingSol = (qrCode.split('-'))[1]
}
export const getSendingSol = () => {
    console.log(sendingSol)
    return sendingSol;
};