const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
  const defaultRoles = [
    { name: "USER", description: "Regular user" },
    { name: "SUPERADMIN", description: "Super admin role" },
    { name: "ADMIN", description: "Administrator" },
    { name: "TRANSLATOR", description: "Translator role" },
    { name: "EDITOR", description: "Editor role" },
    { name: "PROOFREADER", description: "Proofreader role" },
  ]

  for (const role of defaultRoles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


// npx prisma db seed