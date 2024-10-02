import createUserModel from "../models/createUserModel";
class CreateUser_page {
    async createUser(name, job){
        createUserModel.name = name;
        createUserModel.job = job;
        return ApiHelper.sendPostRequest("/users", createUserModel);
    }
}
module.exports = new CreateUser_page()