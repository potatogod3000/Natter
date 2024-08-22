import { profileUrl } from "@/scripts/apiUrls.js";

export async function fetchUser(username = null) {
    let url = `${profileUrl}/get-profile`;

    let userInfo = {
        username: "",
        email: "",
        country: "",
        phoneNumber: "",
        phoneNumberAreaCode: "",
        serversJoined: [],
    };

    if (username) {
        url = `${profileUrl}/get-profile?userName=${username}`;
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });

        if (response.ok || response.status === 200) {
            const data = await response.json();
            userInfo.username = data.userName;
            userInfo.email = data.email;
            userInfo.country = data.country;
            userInfo.phoneNumber = data.phoneNumber;
            userInfo.phoneNumberAreaCode = data.phoneNumberAreaCode;
            userInfo.serversJoined = data.serversJoined;
        } else {
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }

    return userInfo;
}
