
const normalizeUser = async (user, userId) => {


    if (!user.image) {
        user.image = {}
    }
    user.image = {
        url: user.image.url || "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail-300x225.jpg",
        alt: user.image.alt || "user defult picture",
    }
    return {
        ...user,
        address: {
            ...user.address,
            state: user.address.state || ""
        },
        bizNumber: user.bizNumber || (await generateBizNumber()),
        user_id: user.user_id || userId,
    }
}


module.exports = normalizeUser;


