import * as BaseApi from '../api/BaseAPI'

export const addQuestion = async (question) => {
    return (await BaseApi.postItem('question/add', question))
}