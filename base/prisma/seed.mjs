import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const types = ["text", "image", "mcq"]

  for (let t of types) {
    await prisma.cardType.create({
      data: { type: t }
    })
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())