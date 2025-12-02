'use client';

import type { ReactNode } from 'react';

type I18nProviderProps = {
  children: ReactNode;
  locale?: string;
  messages?: Record<string, unknown>;
};

type RichRenderer = (chunks: ReactNode) => ReactNode;

type Translator = ((key: string) => string) & {
  rich: (key: string, values?: Record<string, RichRenderer>) => ReactNode;
};

// Lightweight provider placeholder: no side-effects, just renders children.
export function I18nProvider({ children }: I18nProviderProps) {
  return <>{children}</>;
}

export function useTranslations(_namespace?: string): Translator {
  const translator = ((key: string) => key) as Translator;

  translator.rich = (_key: string, values?: Record<string, RichRenderer>) => {
    if (!values || Object.keys(values).length === 0) {
      return _key;
    }

    // When rich formatters are provided, just call the first formatter with the key.
    const [firstKey] = Object.keys(values);
    const formatter = firstKey ? values[firstKey] : undefined;

    return formatter ? formatter(_key) : _key;
  };

  return translator;
}

export default I18nProvider;

