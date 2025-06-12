// API service for fetching data from the frontend

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    // Use relative path
    const url = `/api/${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "API request failed")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    throw error
  }
}

// User related API calls
export async function getUsers() {
  const response = await fetchAPI<any>("users")
  return response.data
}

export async function getUserById(userId: string) {
  const response = await fetchAPI<any>(`users/${userId}`)
  return response.data
}

// Network related API calls
export async function getNetworkData() {
  const response = await fetchAPI<any>("network")
  return response.data
}

// Commission related API calls
export async function getCommissions(userId?: string) {
  const endpoint = userId ? `commissions?userId=${userId}` : "commissions"
  const response = await fetchAPI<any>(endpoint)
  return response.data
}

// Product related API calls
export async function getProducts() {
  const response = await fetchAPI<any>("products")
  return response.data
}

// Achievement related API calls
export async function getAchievements(userId?: string) {
  const endpoint = userId ? `achievements?userId=${userId}` : "achievements"
  const response = await fetchAPI<any>(endpoint)
  return response.data
}

// Dashboard stats
export async function getDashboardStats(userId?: string) {
  const endpoint = userId ? `dashboard/stats?userId=${userId}` : "dashboard/stats"
  const response = await fetchAPI<any>(endpoint)
  return response.data
}

// Mock function to simulate API calls for features not yet implemented
export async function mockAPICall<T>(data: T, delay = 500): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
}
