import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import AbstractApi from './AbstractApi'
import { Customer, Incident, Invoice, User, WorkSiteAPI, WorkSiteAndRequestAPI, WorkSiteStatus } from './Model'

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
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response = await this.service.post(`/api/users/findSomeUsers`, JSON.stringify(ids), config)

            return response.data as User[]
        } catch (err) {
            console.log(err)
            throw AbstractApi.handleError(err)
        }
    }

    public async createUser(user: User): Promise<User> {
        try {
            const response = await this.service.post(`/api/users/create`, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA',
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
            const response = await this.service.get(`/api/customers/${id}`, {
                headers: { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA' }
            })
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

    public async getWorksiteById(workSiteId: string): Promise<WorkSiteAPI> {
        try {
            const response = await this.service.get(`/api/worksites/${workSiteId}`)
            return response.data as WorkSiteAPI
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async updateWorksiteStatus(workSiteId: string, status: string): Promise<number> {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response = await this.service.patch(`/api/worksites/${workSiteId}/update_status`, config, {
                params: { status: status },
            })

            return response.status
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async uploadComment(workSiteId: string, comment: string): Promise<number> {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await this.service.put(`/api/worksites/${workSiteId}/upload_comment`, comment, config)
            return response.status
        } catch (err) {
            console.log(err)
            throw AbstractApi.handleError(err)
        }
    }

    public async uploadSignatureAndRating(workSiteId: string, signature: string, rating: string): Promise<number> {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response = await this.service.put(`/api/worksites/${workSiteId}/upload_signature_and_satisfaction?satisfaction:${rating}`, JSON.stringify(
                {
                    image: signature
                }
            ), config)

            // ou cette version si attribut pas nommé
            // const response = await this.service.put(`/api/worksites/${workSiteId}/upload_signature_and_satisfaction?satisfaction:${rating}`, signature, config)

            return response.status
        } catch (err) {
            console.log(err)
            throw AbstractApi.handleError(err)
        }
    }


    // ----------------------------------------   INCIDENT ENDPOINTS   ---------------------------------------- //

    public async getIncidentsForWorkSite(workSiteId: string): Promise<Array<Incident>> {
        try {
            const response = await this.service.get(`/api/worksites/${workSiteId}/incidents`, {
                headers: { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA' }
            })
            return response.data as Array<Incident>
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async putIncidentForWorkSite(id: string, incident: Incident): Promise<Incident> {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response = await this.service.put(`/api/worksites/${id}/incident`, JSON.stringify(
                {
                    level: "Minor",
                    title: incident.title,
                    description: incident.description
                }
            ), config)

            return response.data as Incident
        } catch (err) {
            console.log(err)
            throw AbstractApi.handleError(err)
        }
    }

    public async putEvidenceForIncident(id: string, evidence: string): Promise<Incident> {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await this.service.put(`/api/worksites/incident/${id}/evidences`, evidence, config)
            return response.data as Incident
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async deleteIncident(incidentId: string): Promise<number> {
        try {
            const response = await this.service.delete(`/api/worksites/incident/${incidentId}`, {
                headers: { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA' }
            })
            return response.status
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    // ----------------------------------------   INVOICE ENDPOINTS   ---------------------------------------- //

    public async getInvoicesForWorkSite(workSiteId: string): Promise<Array<Invoice>> {
        try {
            const response = await this.service.get(`/api/worksites/${workSiteId}/invoices`, {
                headers: { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA' }
            })
            return response.data as Array<Invoice>
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async putInvoiceForWorkSite(id: string, invoice: Invoice, b64: string): Promise<Invoice> {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await this.service.put(`/api/worksites/${id}/invoice`, JSON.stringify(
                {
                    amount: invoice.amount,
                    title: invoice.title,
                    description: invoice.description,
                    invoiceFile: b64,
                    fileExtension: invoice.type
                }
            ), config)

            return response.data as Invoice
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async putInvoiceImage(invoiceId: string, invoiceB64: string, fileType: string): Promise<Invoice> {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            console.log(invoiceB64.substring(0, 200))

            const response = await this.service.put(`/api/worksites/v2/invoice/${invoiceId}/file?fileExtension=${fileType}`, invoiceB64, config)

            return response.data as Invoice
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async deleteInvoice(invoiceId: string): Promise<number> {
        try {
            const response = await this.service.delete(`/api/worksites/invoice/${invoiceId}`, {
                headers: { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA' }
            })
            return response.status
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }
}

export default MainApi
