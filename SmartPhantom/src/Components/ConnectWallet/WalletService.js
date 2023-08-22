let userWalletAddress = null;

export const setUserWalletAddress = (address) => {
    userWalletAddress = address;
};

export const getUserWalletAddress = () => {
    return userWalletAddress;
};
