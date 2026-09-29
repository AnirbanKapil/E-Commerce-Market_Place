

import  PrismaClient  from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  const adminEmail = 'admin@example.com' // ✉️ Change this to your target email
  const adminPassword = 'SuperSecurePassword123' // 🔑 Change this to a secure password

  // 1. Hash the password securely using bcrypt
  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  // 2. Upsert the User record (Creates the user if missing, updates to ADMIN if they exist)
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: 'ADMIN', // Enforces administrative privilege level overrides
    },
    create: {
      email: adminEmail,
      username: 'admin_master',
      name: 'Store Administrator',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log(`✅ System seeding successful!`)
  console.log(`👑 Admin Account Ready: ${adminUser.email} (Role: ${adminUser.role})`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error occurred during database seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
