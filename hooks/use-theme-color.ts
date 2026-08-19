import { Colors } from '@/constants/theme';

export type ThemeColorName = keyof typeof Colors;

export function useThemeColor(
  colorName: ThemeColorName,
) {
  return Colors[colorName];
}