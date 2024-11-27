class APIClient {
    // URL base de la API (puedes cambiarla a la URL de tu API)
    private baseUrl: string;
  
    // Constructor que recibe la URL base de la API
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    // Método para realizar una solicitud GET
    async get<T>(endpoint: string): Promise<T> {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        this.checkResponse(response); // Verifica la respuesta
        return await response.json(); // Retorna la respuesta en formato JSON
      } catch (error) {
        throw new Error(`Error en la solicitud GET: ${error}`);
      }
    }
  
    // Método para realizar una solicitud POST
    async post<T, U>(endpoint: string, data: T): Promise<U> {
      console.log("Json data ",data);
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        this.checkResponse(response); // Verifica la respuesta
        return await response.json(); // Retorna la respuesta en formato JSON
      } catch (error) {
        throw new Error(`Error en la solicitud POST: ${error}`);
      }
    }
  
    // Método para realizar una solicitud PUT
    async put<T, U>(endpoint: string, id:number, data: T): Promise<U> { 
      console.log("Json data Update", { id, ...data });     
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, ...data }),
        });
        this.checkResponse(response); // Verifica la respuesta
        return await response.json(); // Retorna la respuesta en formato JSON
      } catch (error) {
        throw new Error(`Error en la solicitud PUT: ${error}`);
      }
    }
  
    // Método para realizar una solicitud DELETE
    async delete<T>(endpoint: string): Promise<T> {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: 'DELETE',
        });
        this.checkResponse(response); // Verifica la respuesta
        return await response.json(); // Retorna la respuesta en formato JSON
      } catch (error) {
        throw new Error(`Error en la solicitud DELETE: ${error}`);
      }
    }
  
    // Método privado para verificar el estado de la respuesta
    private checkResponse(response: Response) {
      console.log("Response manage service ",response);
      if (!response.ok) {
        throw new Error(`Error esta baia: ${response.statusText}`);
      }
    }
  }
  
  export default APIClient;
  