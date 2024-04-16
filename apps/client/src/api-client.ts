import { initQueryClient } from '@ts-rest/react-query'
import { apiContract } from 'api'

const API = initQueryClient(apiContract, {
    baseHeaders: {},
    baseUrl: ''
})

export default API;
