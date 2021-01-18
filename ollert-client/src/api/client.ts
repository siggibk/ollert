import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true,
  // TEMP!!!!
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzaWd1cmR1cjk3QGdtYWlsLmNvbSIsImp0aSI6Ijk3MjU2NTdiLWEyNzYtNGQ0OC1hMjkzLTIxM2JmMTk1ZDc2NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzY3MjM3NTctMGQ0Zi00Y2VkLWEyZGMtOTYxNTEyMmRkYjMxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiIiwiZXhwIjoxNjExNjA0MTU0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCJ9.eluMDxcquV_rVJmBCjh3Az2th1XWNo2CJqhU65nMrt0'
  }
})
