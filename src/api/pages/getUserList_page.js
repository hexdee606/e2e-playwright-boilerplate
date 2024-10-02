class GetUserList_page {
    async getUserList(pageNo) {
        return await ApiHelper.sendGetRequest(`/users?page=${pageNo}`)
    }
}

module.exports = new GetUserList_page();