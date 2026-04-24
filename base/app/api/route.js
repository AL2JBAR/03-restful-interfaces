import { getDecks, createDeck } from "../../repos/decks.js"

export async function GET() {
  const result = await getDecks()
  return Response.json(result, { status: result.error?.status || 200 })
}

export async function POST(req) {
  const body = await req.json()
  const result = await createDeck(body)
  return Response.json(result, { status: result.error?.status || 200 })
}