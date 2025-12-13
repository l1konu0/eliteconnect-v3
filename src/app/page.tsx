import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// This page redirects the root path to the default locale
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
