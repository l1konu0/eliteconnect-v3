import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';

// This page only renders when the pathname is missing a locale
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirect to default locale
  redirect(`/${routing.defaultLocale}`);
}
