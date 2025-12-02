'use client';

import type { ReactNode } from 'react';

import type { Translator } from './translationShim';
import { createTranslator } from './translationShim';

type ProviderProps = {
  children: ReactNode;
  locale?: string;
  messages?: Record<string, unknown>;
};

export function useTranslations(namespace?: string): Translator {
  return createTranslator(namespace);
}

export function useLocale() {
  return 'en';
}

export function useMessages() {
  return {};
}

export function NextIntlClientProvider({ children }: ProviderProps) {
  return <>{children}</>;
}

