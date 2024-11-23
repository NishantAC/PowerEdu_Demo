import axios from "axios";
import { API_BASE_URL } from "../common/constant";

const API_URL = API_BASE_URL + "profile/";


const updateUserInfo = async (id, email, address1, address2) => {

    const response = axios.put(API_URL + "updateuserinfo", { id, email, address1, address2 });
    return response;

}

const ProfileService = {
    updateUserInfo
}

export default ProfileService;