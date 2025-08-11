export async function GET(request: Request) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/categories`)

    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.status}`)
    }

    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    console.error('Error fetching categories from backend:', error)
    // Fallback to empty categories if backend is unavailable
    return Response.json({
      categories: [],
    })
  }
}
