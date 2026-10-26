import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SecurityRoute, securityMetadata } from "../_security/security-route";

/** The app-security page under its Czech slug; other locales 404 here. */
const LOCALE = "cs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== LOCALE) notFound();
  return securityMetadata(LOCALE);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== LOCALE) notFound();
  return <SecurityRoute locale={LOCALE} />;
}
