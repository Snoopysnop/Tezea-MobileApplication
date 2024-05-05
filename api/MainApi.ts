import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import AbstractApi from './AbstractApi'
import { Customer, Incident, User, WorkSiteAndRequestAPI } from './Model'

const standaloneInstance = axios.create({
    baseURL: "http://148.60.11.163",
    timeout: 60000
})

axiosRetry(standaloneInstance, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay
})

class MainApi extends AbstractApi {

    private static instance: MainApi

    public static getInstance(): MainApi {
        if (!MainApi.instance) {
            throw new Error('Initialize instance before.')
        }
        return MainApi.instance
    }

    public static initInstance(token?: string): void {
        MainApi.instance = new MainApi("http://148.60.11.163" as any)
    }


    // ----------------------------------------   USER ENDPOINTS   ---------------------------------------- //

    public async getUserById(id: string): Promise<User> {
        try {
            const response = await this.service.get(`/api/users/${id}`)
            return response.data as User
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getUsersById(ids: string[]): Promise<User[]> {
        try {
            const response = await this.service.get(`/api/users/findSomeUsers`, {
                params: {
                    uuids: ids
                }
              })
            return response.data as User[]
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async createUser(user: User): Promise<User> {
        try {
            const response = await this.service.post(`/api/users/create`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data as User
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }


    // ----------------------------------------   CUSTOMER ENDPOINTS   ---------------------------------------- //

    public async getCustomerById(id: string): Promise<Customer> {
        try {
            const response = await this.service.get(`/api/customers/${id}`)
            return response.data as Customer
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }


    // ----------------------------------------   WORKSITE ENDPOINTS   ---------------------------------------- //

    public async getWorksitesAndRequestsForUser(userId: string): Promise<Array<WorkSiteAndRequestAPI>> {
        try {
            const response = await this.service.get(`/api/users/${userId}/allWorkSites`, {
                headers: { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA' }
            })
            return response.data as Array<WorkSiteAndRequestAPI>
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }


    // ----------------------------------------   INCIDENT ENDPOINTS   ---------------------------------------- //

    public async getIncidentsForWorksite(workSiteId: string): Promise<Array<Incident>> {
        try {
            const response = await this.service.get(`/api/worksites/${workSiteId}/incidents`, {
                headers: { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA' }
            })
            return response.data as Array<Incident>
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }
}

export default MainApi
