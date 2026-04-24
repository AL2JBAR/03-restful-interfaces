import prisma from "./prisma.js"

export async function getDecks() {
  try {
    const data = await prisma.deck.findMany()
    return { data }
  } catch (e) {
    return { error: { message: "Failed to fetch decks", status: 500 } }
  }
}

export async function createDeck(body) {
  try {
    const data = await prisma.deck.create({ data: body })
    return { data }
  } catch (e) {
    return { error: { message: "Create failed", status: 400 } }
  }
}

export async function deleteDeck(id) {
  try {
    const slides = await prisma.slide.findMany({ where: { deckId: id } })
    if (slides.length > 0)
      return { error: { message: "Deck not empty", status: 400 } }

    await prisma.deck.delete({ where: { id } })
    return { data: "Deleted" }
  } catch {
    return { error: { message: "Deck not found", status: 404 } }
  }
}