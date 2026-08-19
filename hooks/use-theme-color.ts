import { Colors } from '@/constants/theme';

type ColorName = keyof typeof Colors;

export function useThemeColor(
  props: {
    light?: string;
    dark?: string;
  },
  colorName: ColorName,
) {
  // Our app uses one custom color system
  // for both light/dark components.
  //
  // The light/dark values are kept in the
  // function signature because Expo's default
  // components still pass them.

  return Colors[colorName];
}