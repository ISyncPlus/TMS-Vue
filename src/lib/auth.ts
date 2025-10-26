export interface StoredUser {
  id: string
  email: string
  name: string
  passwordHash: string
}

const STORAGE_KEY = 'tms_users'

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  return window.localStorage
}

export function getStoredUsers(): StoredUser[] {
  const ls = getLocalStorage()
  if (!ls) return []
  try {
    const raw = ls.getItem(STORAGE_KEY) || '[]'
    return JSON.parse(raw) as StoredUser[]
  } catch (e) {
    return []
  }
}

export function saveStoredUsers(users: StoredUser[]) {
  const ls = getLocalStorage()
  if (!ls) return
  ls.setItem(STORAGE_KEY, JSON.stringify(users))
}

export async function hashPassword(password: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto?.subtle) {
    // fallback to btoa for environments without Web Crypto
    return btoa(password)
  }
  const enc = new TextEncoder()
  const data = enc.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  const bytes = new Uint8Array(hash)
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const users = getStoredUsers()
  return users.find(u => u.email.toLowerCase() === email.toLowerCase())
}

export async function addUser(email: string, password: string, name: string): Promise<StoredUser> {
  const users = getStoredUsers()
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (existing) throw new Error('User already exists')
  const passwordHash = await hashPassword(password)
  const user: StoredUser = {
    id: Math.random().toString(36).substring(2, 11),
    email,
    name,
    passwordHash,
  }
  users.push(user)
  saveStoredUsers(users)
  return user
}

export async function verifyCredentials(email: string, password: string): Promise<StoredUser | null> {
  const user = findUserByEmail(email)
  if (!user) return null
  const hash = await hashPassword(password)
  return hash === user.passwordHash ? user : null
}
