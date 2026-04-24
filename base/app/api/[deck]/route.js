import { deleteDeck } from "../../../repos/decks.js"
import { getSlides, createSlide } from "../../../repos/slides.js"

export async function GET(_, { params }) {
  const result = await getSlides(params.deck)
  return Response.json(result, { status: result.error?.status || 200 })
}

export async function POST(req, { params }) {
  const body = await req.json()
  const result = await createSlide(params.deck, body)
  return Response.json(result, { status: result.error?.status || 200 })
}

export async function DELETE(_, { params }) {
  const result = await deleteDeck(params.deck)
  return Response.json(result, { status: result.error?.status || 200 })
}