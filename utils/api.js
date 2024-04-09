import axios from 'axios'
import { versionApi, api } from "@/lib/configApi"

export default axios.create({
    baseURL: `${api}/${versionApi}`
})