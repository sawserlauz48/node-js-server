
const normalizeUser = (userData) => {


    if (!userData.image) {
        userData.image = {}
    }
    userData.image = {
        url: userData.image.url || "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
        alt: userData.image.alt || "user defult picture",
    }
    return {
        ...userData,
        address: {
            ...userData.address,
            state: userData.address.state || ""
        },
    }
}




module.exports = normalizeUser;


