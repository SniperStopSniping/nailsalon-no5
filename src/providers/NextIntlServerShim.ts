import type { Translator } from './translationShim';
import { createTranslator } from './translationShim';

type GetTranslationsParams = {
  locale?: string;
  namespace?: string;
};

export async function getTranslations(params?: GetTranslationsParams): Promise<Translator> {
  return createTranslator(params?.namespace);
}

export function unstable_setRequestLocale(_locale: string) {
  // No-op: locale handling disabled in shim mode.
}

export async function getMessages() {
  return {};
}

type RequestConfigHandler<TInput = { locale: string }> = (input: TInput) => Promise<{
  messages: Record<string, unknown>;
}>;

export function getRequestConfig<TInput>(handler: RequestConfigHandler<TInput>) {
  return handler;
}

