import type { ReactNode } from 'react';

export type RichRenderer = (chunks: ReactNode) => ReactNode;

export type Translator = ((key: string) => string) & {
  rich: (key: string, values?: Record<string, RichRenderer>) => ReactNode;
};

const STRINGS: Record<string, string> = {
  'Profile.edit': 'Edit profile',
  'Profile.my_appointments': 'My appointments',
  'Profile.next_appointment': 'Next appointment',
  'Profile.tech': 'Tech',
  'Profile.price': 'Price',
  'Profile.reward_applied': 'Reward applied',
  'Profile.total': 'Total',
  'Profile.view_change_appointment': 'Change appointment',
  'Profile.view_appointment_history': 'View appointment history',
  'Profile.my_nail_gallery': 'My nail gallery',
  'Profile.rewards': 'Rewards',
  'Profile.invite_earn': 'Invite friends and earn a free manicure',
  'Profile.friends_phone_number': "Friend's phone number",
  'Profile.share_referral_link': 'Share referral link',
  'Profile.rate_us_google': 'Rate us on Google',
  'Profile.beauty_profile': 'Beauty profile',
  'Profile.payment_methods': 'Payment methods',
};

export function createTranslator(namespace?: string): Translator {
  const translator = ((key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;

    if (STRINGS[fullKey]) {
      return STRINGS[fullKey];
    }

    const last = fullKey.split('.').pop() ?? fullKey;

    return last
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }) as Translator;

  translator.rich = (key: string, values?: Record<string, RichRenderer>) => {
    const base = translator(key);

    if (!values || Object.keys(values).length === 0) {
      return base;
    }

    return Object.keys(values).reduce<ReactNode>((acc, currentKey) => {
      const formatter = values[currentKey];
      return formatter ? formatter(acc) : acc;
    }, base);
  };

  return translator;
}

