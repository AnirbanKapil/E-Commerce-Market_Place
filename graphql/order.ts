

import { gql } from 'graphql-tag'
import prisma from '@/lib/prisma'

export const orderTypeDefs = gql`
  enum OrderStatus {
    PENDING
    PROCESSING
    SHIPPED
    DELIVERED
    CANCELLED
  }

  type CartItem {
    id: String!
    quantity: Int!
    product: Product!
  }

  type OrderItem {
    id: String!
    quantity: Int!
    price: Float!
    product: Product!
  }

  type Order {
    id: String!
    totalAmount: Float!
    status: OrderStatus!
    createdAt: String!
    items: [OrderItem!]!
  }

  extend type Query {
    cart: [CartItem!]!
    myOrders: [Order!]!
  }

  extend type Mutation {
    addToCart(productId: String!, quantity: Int!): CartItem!
    checkout: Order!
  }
`

export const orderResolvers = {
  Query: {
    cart: async (_: any, __: any, context: any) => {
      if (!context.session?.user) throw new Error("Not authenticated")
      return await prisma.cartItem.findMany({
        where: { user: { email: context.session.user.email } },
        include: { product: true }
      })
    },
    myOrders: async (_: any, __: any, context: any) => {
      if (!context.session?.user) throw new Error("Not authenticated")
      return await prisma.order.findMany({
        where: { user: { email: context.session.user.email } },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' }
      })
    }
  },
  Mutation: {
    addToCart: async (_: any, { productId, quantity }: any, context: any) => {
      if (!context.session?.user) throw new Error("Not authenticated")
      
      const user = await prisma.user.findUnique({ where: { email: context.session.user.email } })
      if (!user) throw new Error("User record not found")

      return await prisma.cartItem.upsert({
        where: { userId_productId: { userId: user.id, productId } },
        update: { quantity: { increment: quantity } },
        create: { userId: user.id, productId, quantity },
        include: { product: true }
      })
    },
    checkout: async (_: any, __: any, context: any) => {
      if (!context.session?.user) throw new Error("Not authenticated")

      const user = await prisma.user.findUnique({
        where: { email: context.session.user.email },
        include: { cartItems: { include: { product: true } } }
      })

      if (!user || user.cartItems.length === 0) throw new Error("Your shopping cart is empty")

      
      const totalAmount = user.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

      return await prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
          data: {
            userId: user.id,
            totalAmount,
            status: 'PENDING'
          }
        })

        for (const item of user.cartItems) {
          if (item.product.stock < item.quantity) {
            throw new Error(`Insufficient inventory for product: ${item.product.name}`)
          }

          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } }
          })

          await tx.orderItem.create({
            data: {
              orderId: newOrder.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price 
            }
          })
        }

        await tx.cartItem.deleteMany({ where: { userId: user.id } })

        return await tx.order.findUnique({
          where: { id: newOrder.id },
          include: { items: { include: { product: true } } }
        })
      })
    }
  }
}
