const axiosClient = require("./api");

/*webhook.util.js*/
const create =  async (data) => {
    let res = await axiosClient.post('/webhooks', data);
    return res;
};
const getDetailWebhookById = async (webhookId) => {
    let res = await axiosClient.get(`/webhooks/${webhookId}`);
    return res;
};
const updateWebhookById = async (webhookId, data) => {
    let res = await api.put(`/webhooks/${webhookId}`, data);
    return res;
};
const deleteWebhookById = async (webhookId) => {
    let res = await axiosClient.delete(`/webhooks/${webhookId}`);
    return res;
};
const deleteWebhookByUrl =  async (urlWebhook) => {
    // Thêm url vào query để delete https://oauth.casso.vn/v1/webhooks?webhook=https://website-cua-ban.com/api/webhook
    let query = { params: { webhook: urlWebhook } };
    let res = await axiosClient.delete(`/webhooks`, query);
    return res;
};

const webhook = {create, getDetailWebhookById, updateWebhookById, deleteWebhookById, deleteWebhookByUrl};
module.exports = webhook;