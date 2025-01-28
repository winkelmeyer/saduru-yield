import { db } from './index';
import { profiles } from './schema';
import { eq } from 'drizzle-orm';

export async function getProfileByEmail(email: string) {
  const results = await db
    .select()
    .from(profiles)
    .where(eq(profiles.email, email))
    .limit(1);
  
  return results[0];
}

export async function getProfileById(id: string) {
  const results = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, id))
    .limit(1);
  
  return results[0];
}

export async function createOrUpdateProfile(profile: typeof profiles.$inferInsert) {
  return db
    .insert(profiles)
    .values(profile)
    .onConflictDoUpdate({
      target: profiles.id,
      set: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        referralCode: profile.referralCode,
        updatedAt: new Date()
      }
    });
} 