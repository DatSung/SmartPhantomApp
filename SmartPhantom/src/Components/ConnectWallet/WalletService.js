let userWalletAddress = null;
let targetWalletAddress = null;

export const setTagetWalletAddress = (address) => {
    targetWalletAddress = address
}

export const setUserWalletAddress = (address) => {
    userWalletAddress = address;
};


export const getTargetWalletAddress = () => {
    return targetWalletAddress;
}

export const getUserWalletAddress = () => {
    // console.log(userWalletAddress)
    return userWalletAddress;
};

