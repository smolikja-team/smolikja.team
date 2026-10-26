import { notFound } from "next/navigation";

import { securityOgImage, securityOgImageMetadata } from "../_security/security-route";

/** Share image of the app-security page; like the page, it only exists for "cs". */
const LOCALE = "cs";

export async function generateImageMetadata() {
  return securityOgImageMetadata(LOCALE);
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== LOCALE) notFound();
  return securityOgImage(LOCALE);
}
