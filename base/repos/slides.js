import prisma from "./prisma.js"

export async function getSlides(deckId) {
  try {
    const data = await prisma.slide.findMany({ where: { deckId } })
    return { data }
  } catch {
    return { error: { message: "Error", status: 500 } }
  }
}

export async function createSlide(deckId, body) {
  try {
    const deck = await prisma.deck.findUnique({ where: { id: deckId } })
    if (!deck)
      return { error: { message: "Deck not found", status: 404 } }

    const data = await prisma.slide.create({
      data: { ...body, deckId }
    })
    return { data }
  } catch {
    return { error: { message: "Create failed", status: 400 } }
  }
}

export async function deleteSlide(deckId, slideId) {
  try {
    const cards = await prisma.card.findMany({ where: { slideId } })
    if (cards.length > 0)
      return { error: { message: "Slide not empty", status: 400 } }

    await prisma.slide.delete({ where: { id: slideId } })
    return { data: "Deleted" }
  } catch {
    return { error: { message: "Slide not found", status: 404 } }
  }
}