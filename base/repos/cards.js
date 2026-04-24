import prisma from "./prisma.js"

export async function getCards(deckId, slideId) {
  try {
    const slide = await prisma.slide.findUnique({ where: { id: slideId } })
    if (!slide || slide.deckId !== deckId)
      return { error: { message: "Invalid relation", status: 400 } }

    const data = await prisma.card.findMany({ where: { slideId } })
    return { data }
  } catch {
    return { error: { message: "Error", status: 500 } }
  }
}

export async function createCard(deckId, slideId, body) {
  try {
    const slide = await prisma.slide.findUnique({ where: { id: slideId } })
    if (!slide || slide.deckId !== deckId)
      return { error: { message: "Invalid relation", status: 400 } }

    const data = await prisma.card.create({
      data: { ...body, slideId }
    })

    return { data }
  } catch {
    return { error: { message: "Create failed", status: 400 } }
  }
}

export async function deleteCard(deckId, slideId, cardId) {
  try {
    await prisma.card.delete({ where: { id: cardId } })
    return { data: "Deleted" }
  } catch {
    return { error: { message: "Not found", status: 404 } }
  }
}

export async function updateCard(deckId, slideId, cardId, body) {
  try {
    const data = await prisma.card.update({
      where: { id: cardId },
      data: body
    })
    return { data }
  } catch {
    return { error: { message: "Update failed", status: 400 } }
  }
}