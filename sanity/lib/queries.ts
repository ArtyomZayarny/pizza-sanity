import { defineQuery } from "next-sanity";

const imageFields = `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt,
  hotspot,
  crop
`;

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0] {
    title,
    logo { ${imageFields} },
    navLinks[] { label, href },
    heroHeading,
    heroSubheading,
    heroImage { ${imageFields} },
    heroCtaText,
    heroCtaLink,
    contactAddress,
    contactPhone,
    contactEmail,
    openingHours,
    orderFormTitle,
    orderFormDescription,
    orderFormSuccessMessage,
    formLabels {
      nameLabel,
      emailLabel,
      phoneLabel,
      addressLabel,
      notesLabel
    }
  }
`);

export const MENU_ITEMS_QUERY = defineQuery(/* groq */ `
  *[_type == "menuItem"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    image { ${imageFields} },
    category,
    sizes[] { name, priceModifier }
  }
`);

export const MENU_ITEMS_FEATURED_QUERY = defineQuery(/* groq */ `
  *[_type == "menuItem"] | order(order asc) [0...6] {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    image { ${imageFields} },
    category,
    sizes[] { name, priceModifier }
  }
`);
