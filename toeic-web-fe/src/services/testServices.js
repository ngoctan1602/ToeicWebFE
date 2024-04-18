import * as BaseApi from '../api/BaseAPI'

export const createNewTest = async (test) => {
    return await BaseApi.postItem("test/add", test)
}
export const getTestByYearAndTopic = async (param) => {
    return await BaseApi.getItems("/test/topic/year", param)
}
export const getTestById = async (param) => {
    return await BaseApi.getItems("/test", param)
}