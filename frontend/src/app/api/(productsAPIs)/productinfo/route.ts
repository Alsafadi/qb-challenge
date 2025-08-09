export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const ids = searchParams.get('ids')

    const response = await fetch(
      `${process.env.BACKEND_URL}/productinfo?ids=${ids}`,
    )

    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.status}`)
    }

    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    console.error('Error fetching products from backend:', error)
    // Fallback to empty products if backend is unavailable
    return Response.json({
      products: [],
    })
  }
}
