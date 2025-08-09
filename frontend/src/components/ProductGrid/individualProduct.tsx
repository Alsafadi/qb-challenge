'use client'
import { Product } from '@/types/Product'
import { Card, CardBody, CardFooter, Image, Chip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { AddToCartButton } from '../Product/AddToCartButton'

export function IndividualProduct({
  product,
  isGrid,
  inCartAlready,
}: {
  product: Product
  isGrid: boolean
  inCartAlready: boolean
}) {
  return (
    <div className={`${isGrid ? 'flex h-full' : 'w-full'}`}>
      <Card className={`${isGrid ? 'flex-col' : 'max-h-[300px]'}`}>
        <CardBody className="overflow-visible p-0">
          <div className={`flex ${isGrid ? 'flex-col' : 'flex-row'} gap-2`}>
            <Image
              src={product.image_url}
              alt={product.name}
              className={`w-full ${
                isGrid ? 'rounded-b-none' : 'rounded-r-none'
              } object-cover`}
              classNames={{
                blurredImg: `w-full ${
                  isGrid ? 'rounded-b-none' : 'rounded-r-none'
                } object-cover`,
              }}
              width={isGrid ? '100%' : 300}
              height={isGrid ? 250 : 300}
              loading="eager"
            />

            <div className="p-8 w-full h-full flex flex-col justify-between items-stretch">
              <div className="w-full flex flex-col">
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

              <div className="w-full flex flex-col items-end mt-4 gap-2 flex-1">
                <div className="flex items-center">
                  <Icon icon="lucide:tag" className="text-default-500 mr-1" />
                  <span className="text-2xl font-bold text-foreground">
                    {product.price} SEK
                  </span>
                </div>

                <div className="flex gap-2">
                  {inCartAlready && (
                    <div className="flex items-center">
                      <Chip color="success" size="sm" variant="flat">
                        <span className="inline text-small text-default-500">
                          <Icon
                            icon="lucide:check"
                            className="text-default-500 mr-1 inline"
                          />
                          added to cart
                        </span>
                      </Chip>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Icon
                      icon="lucide:package"
                      className="text-default-500 mr-1"
                    />
                    <span className="text-small text-default-500">
                      {product.stock_quantity} in stock
                    </span>
                  </div>
                </div>
                {!isGrid && <AddToCartButton productId={product.id} />}
              </div>
            </div>
          </div>
        </CardBody>
        {isGrid && (
          <CardFooter className="justify-end">
            <AddToCartButton productId={product.id} />
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
