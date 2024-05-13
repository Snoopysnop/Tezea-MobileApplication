import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import AbstractApi from './AbstractApi'
import { Customer, Incident, Invoice, User, WorkSiteAPI, WorkSiteAndRequestAPI } from './Model'

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
            const response = await this.service.get(`/api/users/${userId}/allWorkSites`)
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
                    // "Content-Type": "application/json"
                    "Content-Type": "text/plain"
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
            const response = await this.service.put(`/api/worksites/${workSiteId}/upload_signature_and_satisfaction?satisfaction=${rating}`, signature, config)

            return response.status
        } catch (err) {
            console.log(err)
            throw AbstractApi.handleError(err)
        }
    }


    // ----------------------------------------   INCIDENT ENDPOINTS   ---------------------------------------- //

    public async getIncidentsForWorkSite(workSiteId: string): Promise<Array<Incident>> {
        try {
            const response = await this.service.get(`/api/worksites/${workSiteId}/incidents`)
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
                    level: incident.level,
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
            const response = await this.service.delete(`/api/worksites/incident/${incidentId}`)
            return response.status
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    // ----------------------------------------   INVOICE ENDPOINTS   ---------------------------------------- //

    public async getInvoicesForWorkSite(workSiteId: string): Promise<Array<Invoice>> {
        try {
            const response = await this.service.get(`/api/worksites/${workSiteId}/invoices`)
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
            const response = await this.service.delete(`/api/worksites/invoice/${invoiceId}`)
            return response.status
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }
}

export default MainApi
