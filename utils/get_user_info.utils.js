const axiosClient = require("./api");

const getDetailUser = async () => {
    try {
        let res = await axiosClient.get(`/userInfo`);
        return res;  // Thêm .data để lấy dữ liệu thực sự từ phản hồi
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
};

const userInfo = { getDetailUser };

module.exports = userInfo;  // Sử dụng module.exports thay vì export default
