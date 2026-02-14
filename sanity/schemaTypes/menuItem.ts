import { defineType, defineField, defineArrayMember } from "sanity";
import { PackageIcon } from "@sanity/icons";

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Pizza", value: "pizza" },
          { title: "Drinks", value: "drinks" },
          { title: "Sides", value: "sides" },
          { title: "Desserts", value: "desserts" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sizes",
      title: "Sizes (pizza only)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "sizeOption",
          fields: [
            defineField({ name: "name", type: "string", title: "Size name" }),
            defineField({
              name: "priceModifier",
              type: "number",
              title: "Price modifier",
              initialValue: 0,
            }),
          ],
        }),
      ],
      hidden: ({ parent }) => parent?.category !== "pizza",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
