import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const order = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "customerName",
      title: "Customer name",
      type: "string",
    }),
    defineField({
      name: "customerEmail",
      title: "Customer email",
      type: "string",
    }),
    defineField({
      name: "customerPhone",
      title: "Customer phone",
      type: "string",
    }),
    defineField({
      name: "deliveryAddress",
      title: "Delivery address",
      type: "text",
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "orderItem",
          fields: [
            defineField({
              name: "menuItem",
              type: "reference",
              to: [{ type: "menuItem" }],
            }),
            defineField({ name: "quantity", type: "number", initialValue: 1 }),
            defineField({ name: "size", type: "string", title: "Size (e.g. Large)" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "total",
      title: "Total",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Preparing", value: "preparing" },
          { title: "Delivered", value: "delivered" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "createdAt",
      title: "Created at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "stripeSessionId",
      title: "Stripe Session ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "isPaid",
      title: "Paid",
      type: "boolean",
      readOnly: true,
    }),
    defineField({
      name: "paidAt",
      title: "Paid at",
      type: "datetime",
      readOnly: true,
    }),
  ],
});
