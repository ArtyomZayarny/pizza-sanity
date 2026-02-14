import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "header", title: "Header" },
    { name: "hero", title: "Hero" },
    { name: "contact", title: "Contact" },
    { name: "orderForm", title: "Order Form" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      initialValue: "Pizza",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "header",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "navLinks",
      title: "Navigation links",
      type: "array",
      group: "header",
      of: [
        defineArrayMember({
          type: "object",
          name: "navLink",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "href", type: "string", title: "Link" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "heroHeading",
      title: "Hero heading",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero subheading",
      type: "text",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA text",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero CTA link",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "contactAddress",
      title: "Address",
      type: "text",
      group: "contact",
    }),
    defineField({
      name: "contactPhone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactEmail",
      title: "Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "openingHours",
      title: "Opening hours",
      type: "text",
      group: "contact",
    }),
    defineField({
      name: "orderFormTitle",
      title: "Order form title",
      type: "string",
      group: "orderForm",
    }),
    defineField({
      name: "orderFormDescription",
      title: "Order form description",
      type: "text",
      group: "orderForm",
    }),
    defineField({
      name: "orderFormSuccessMessage",
      title: "Success message",
      type: "string",
      group: "orderForm",
    }),
    defineField({
      name: "formLabels",
      title: "Form field labels",
      type: "object",
      group: "orderForm",
      options: { collapsible: true },
      fields: [
        defineField({ name: "nameLabel", type: "string", title: "Name label" }),
        defineField({ name: "emailLabel", type: "string", title: "Email label" }),
        defineField({ name: "phoneLabel", type: "string", title: "Phone label" }),
        defineField({ name: "addressLabel", type: "string", title: "Address label" }),
        defineField({ name: "notesLabel", type: "string", title: "Notes label" }),
      ],
    }),
  ],
});
