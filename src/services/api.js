// Servizio API centralizzato per future integrazioni backend
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

class ApiService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Aggiungi token se presente
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ message: "Errore sconosciuto" }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Metodi pronti per future implementazioni
  async getRecipes(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/recipes?${query}`);
  }

  async getRecipeById(id) {
    return this.request(`/recipes/${id}`);
  }

  async createRecipe(data) {
    return this.request("/recipes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateRecipe(id, data) {
    return this.request(`/recipes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteRecipe(id) {
    return this.request(`/recipes/${id}`, {
      method: "DELETE",
    });
  }

  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async getUserProfile() {
    return this.request("/users/me");
  }

  async addReview(recipeId, review) {
    return this.request(`/recipes/${recipeId}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
    });
  }
}

export default new ApiService();
