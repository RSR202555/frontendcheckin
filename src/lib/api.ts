// Em produção, a API deve ser acessada sempre via HTTPS no domínio do backend.
// Mantemos a variável de ambiente para flexibilidade, mas usamos um fallback
// seguro em vez de localhost para evitar chamadas HTTP inseguras.
export const API_URL =
  import.meta.env.VITE_API_URL || 'https://app-app.qeqzxb.easypanel.host';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na API (${response.status}): ${await response.text()}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  get:   <T>(path: string) => request<T>(path),
  post:  <T>(path: string, body: unknown) => request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  }),
  patch: <T>(path: string, body: unknown) => request<T>(path, {
    method: 'PATCH',
    body: JSON.stringify(body),
  }),
  delete: <T>(path: string) => request<T>(path, {
    method: 'DELETE',
  }),
};
