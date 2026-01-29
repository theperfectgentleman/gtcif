import crypto from 'crypto';

/**
 * Creates a simple SHA-256 hash of the password.
 * In a high-security production app, use bcrypt or argon2.
 * For this request, we are using a simple hash as requested.
 */
export function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Verifies if the provided password matches the stored hash.
 */
export function verifyPassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash;
}
