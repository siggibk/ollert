export function tokenSet() {
  const token: string | null = localStorage.getItem('jwt-tkn')
  return token ? true : false
}