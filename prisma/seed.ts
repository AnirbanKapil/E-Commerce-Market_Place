

import  PrismaClient  from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  const adminEmail = 'admin@mail.com' 
  const adminPassword = 'SuperSecure123' 

  
  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: 'ADMIN',
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
