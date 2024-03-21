import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"



const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ["Tasks"],   
    endpoints: (builder) => ({ })
})

export const { useGetTaskQuery, useUpdateTaskMutation, useAddTaskMutation } = baseApi;

export default baseApi;