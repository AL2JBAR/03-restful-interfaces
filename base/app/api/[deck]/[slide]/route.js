import { getCards, createCard } from "../../../../repos/cards.js"
import { deleteSlide } from "../../../../repos/slides.js"

export async function GET(_, { params }) {
  const result = await getCards(params.deck, params.slide)
  return Response.json(result, { status: result.error?.status || 200 })
}

export async function POST(req, { params }) {
  const body = await req.json()
  const result = await createCard(params.deck, params.slide, body)
  return Response.json(result, { status: result.error?.status || 200 })
}

export async function DELETE(_, { params }) {
  const result = await deleteSlide(params.deck, params.slide)
  return Response.json(result, { status: result.error?.status || 200 })
}