'use client'
import { Product } from '@/types/Product'
import { Card, CardBody, CardFooter, Button, Image, Chip } from '@heroui/react'
import { Icon } from '@iconify/react'

export function IndividualProduct({
  product,
  isGrid,
}: {
  product: Product
  isGrid: boolean
}) {
  const addProductToCart = async ({ productId }: { productId: string }) => {
    // Implement add to cart functionality
    await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Failed to add product to cart')
      }
    })
  }

  return (
    <div className="flex ">
      <Card>
        <CardBody className="overflow-visible p-0">
          <div className={`flex ${isGrid ? 'flex-col' : 'flex-row'} gap-2`}>
            <Image
              src={product.image_url}
              alt={product.name}
              className={`w-full ${
                isGrid ? 'rounded-b-none' : 'rounded-r-none'
              } object-cover`}
              width={'100%'}
              height={isGrid ? 150 : 300}
              loading="lazy"
            />

            <div className="p-8 w-full">
              <div
                className={`flex flex-col justify-between w-full items-start`}
              >
                <div className="w-full">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    {product.name}
                  </h2>
                  <p className="text-small text-default-500 mt-1 w-full">
                    {product.description}
                  </p>
                  <div className="text-xs mt-4">
                    <span>Category: </span>
                    <Chip color="primary" size="sm" variant="flat">
                      {product.category}
                    </Chip>
                  </div>
                </div>
                <div className=" w-full flex flex-col items-end mt-4 gap-2">
                  <div className="flex items-center">
                    <Icon icon="lucide:tag" className="text-default-500 mr-1" />
                    <span className="text-2xl font-bold text-foreground">
                      {product.price} SEK
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Icon
                      icon="lucide:package"
                      className="text-default-500 mr-1"
                    />
                    <span className="text-small text-default-500">
                      {product.stock_quantity} in stock
                    </span>
                  </div>
                  {!isGrid && (
                    <Button
                      color="primary"
                      variant="solid"
                      endContent={<Icon icon="lucide:shopping-cart" />}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
        {isGrid && (
          <CardFooter className="justify-end">
            <Button
              color="primary"
              variant="solid"
              endContent={<Icon icon="lucide:shopping-cart" />}
              onPress={() => addProductToCart({ productId: product.id })}
              className="w-full"
            >
              Add to Cart
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
