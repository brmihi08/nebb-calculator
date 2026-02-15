import type { NavigationState, PartialState, Route } from '@react-navigation/native';

export function getActiveRoutePath(
  state: NavigationState | PartialState<NavigationState> | undefined
): string[] {
  if (!state) return [];
  // @react-navigation types allow routes as Route<string>[]
  const routes = (state.routes ?? []) as Route<string>[];
  if (!routes.length) return [];

  const index = typeof state.index === 'number' ? state.index : routes.length - 1;
  const route = routes[index];
  const name = route.name;

  // @ts-expect-error - nested state exists at runtime
  const childState: NavigationState | PartialState<NavigationState> | undefined = route.state;
  if (childState) {
    return [name, ...getActiveRoutePath(childState)];
  }

  return [name];
}
