import * as BaseApi from '../api/BaseAPI'

export const createNewTest = async (history) => {
    return await BaseApi.postItem("history/create", history)
}

export const getHistoryByTestAndUser = async (param) => {
    return await BaseApi.getItems("history/test", param)
}

export const getHistoryOverView = async (param) => {
    return await BaseApi.getItems("history/overview", param)
}

export const getSelected = async (param) => {
    return await BaseApi.getItems("history/part", param)
}