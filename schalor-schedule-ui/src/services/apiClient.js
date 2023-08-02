import axios from "axios"


class ApiClient{
    constructor(remoteHostUrl){
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "schalor_schedule_token"
    }

    setToken(token){
        this.token=token
        localStorage.setItem(this.tokenName, token)
    }

    async request({ endpoint, method = `GET`,data={}}){
        const url = `${this.remoteHostUrl}/${endpoint}`
        const headers ={
            "Content-Type": "application/json"
        }
        if(this.token){
            headers["Authorization"] =`Bearer ${this.token}`
        }
        try{
            const res = await axios({url, method, data, headers})
            return{data: res.data, error: null}
        }catch(error){
            console.error({errorResponse: error.response})
            const message = error?.response?.data?.error?.message
            return { data: null, error: message ?? String(error) }
        }
    }

    async registerUser(credentials) {
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials })
    }
    async loginUser(credentials) {
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials })
    }
    async createNewTerm(term) {
        return await this.request({ endpoint: `terms/`, method: `POST`, data: term })
    }
    async fetchTerms() {
        return await this.request({ endpoint: `terms/`, method: `GET`})
    }
    async createNewAssignment(termIndex, term) {
        return await this.request({ endpoint: `terms/${termIndex}/assignments`, method: `POST`, data: nutrition })
    }
    async fetchAssignments(termIndex) {
        return await this.request({ endpoint: `terms/${termIndex}/`, method: `GET`})
    }
    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/me`, method: `GET` })
    }
    async logoutUser(){
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }
}

export default new ApiClient("http://localhost:3001")