/**
 * The page a contact form sits on. The form posts it as a hidden field and
 * the enquiry's subject names it (`dict.contact.mail.subjects`), so enquiries
 * from the app-security page stand out in the inbox.
 */
export const contactSources = ["landing", "security"] as const;

export type ContactSource = (typeof contactSources)[number];

export function isContactSource(value: string): value is ContactSource {
  return (contactSources as readonly string[]).includes(value);
}
