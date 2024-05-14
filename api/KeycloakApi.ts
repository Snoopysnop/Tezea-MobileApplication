import axios from 'axios'
import axiosRetry from 'axios-retry'
import AbstractApi from './AbstractApi'
import { hashPassword } from '../common/utils/utils'
import { isExpired } from "react-jwt";
import MainApi from './MainApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const standaloneInstance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    timeout: 60000
})

axiosRetry(standaloneInstance, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay
})

class KeycloakApi extends AbstractApi {

    private static instance: KeycloakApi

    public static getInstance(): KeycloakApi {
        if (!KeycloakApi.instance) {
            throw new Error('Initialize instance before.')
        }
        return KeycloakApi.instance
    }

    public static initInstance(): void {
        KeycloakApi.instance = new KeycloakApi(process.env.REACT_APP_URL as any)
    }

    public static async isTokenValid(): Promise<boolean> {
        const token = await AsyncStorage.getItem("access-token")
        if (token && !isExpired(token)) {
            return true
        } else return false
    }

    public async getToken(): Promise<String> {
        try {

            const formData = new URLSearchParams();
            formData.append('grant_type', 'client_credentials');
            formData.append('client_id', process.env.REACT_APP_CLIENT_ID!);
            formData.append('client_secret', process.env.REACT_APP_CLIENT_SECRET!);
            const response = await this.service.post("/realms/Tezea/protocol/openid-connect/token", formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            return response.data["access_token"]

        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    public async login(username: string, password: string): Promise<void> {
        try {
            const hashedPassword: string = hashPassword(password);
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', hashedPassword);
            formData.append('grant_type', 'password');
            formData.append('client_id', process.env.REACT_APP_CLIENT_ID!);
            formData.append('client_secret', process.env.REACT_APP_CLIENT_SECRET!);

            const response = await this.service.post('/realms/Tezea/protocol/openid-connect/token', formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            const token = response.data["access_token"]
            await AsyncStorage.setItem("access-token", token);
            MainApi.initInstance(token)

        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }
}

export default KeycloakApi