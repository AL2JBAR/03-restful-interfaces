import { deleteCard, updateCard } from "../../../../../repos/cards.js"

export async function DELETE(_, { params }) {
  const result = await deleteCard(params.deck, params.slide, params.card)
  return Response.json(result, { status: result.error?.status || 200 })
}

export async function PATCH(req, { params }) {
  const body = await req.json()
  const result = await updateCard(params.deck, params.slide, params.card, body)
  return Response.json(result, { status: result.error?.status || 200 })
}