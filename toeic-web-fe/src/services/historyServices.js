import * as BaseApi from '../api/BaseAPI'

export const createNewTest = async (history) => {
    return await BaseApi.postItem("history/create", history)
}

export const getHistoryByTestAndUser = async (param) => {
    return await BaseApi.getItems("history/test", param)
}