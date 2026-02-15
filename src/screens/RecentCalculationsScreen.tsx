import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph, Searchbar, Text, Title, useTheme } from 'react-native-paper';
import { clearRecentRoutes, loadRecentRoutes, RecentRouteEntry } from '../utils/recent';

function friendlyTitleFromPath(path: string[]): string {
  // Best-effort: use last route name.
  return path[path.length - 1] ?? 'Unknown';
}

export default function RecentCalculationsScreen({ navigation }: any) {
  const theme = useTheme();
  const [items, setItems] = useState<RecentRouteEntry[]>([]);
  const [query, setQuery] = useState('');

  const refresh = useCallback(async () => {
    setItems(await loadRecentRoutes());
  }, []);

  useEffect(() => {
    const unsub = navigation.addListener('focus', refresh);
    return unsub;
  }, [navigation, refresh]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((e) => {
      const title = (e.title ?? friendlyTitleFromPath(e.path)).toLowerCase();
      return title.includes(q) || e.path.join(' > ').toLowerCase().includes(q);
    });
  }, [items, query]);

  const handleOpen = (entry: RecentRouteEntry) => {
    // Path is like ['TAB', 'AirflowVolumetricFlowRate'].
    if (!entry.path.length) return;

    if (entry.path.length === 1) {
      navigation.navigate(entry.path[0]);
      return;
    }

    navigation.navigate(entry.path[0], { screen: entry.path[1] });
  };

  const doClear = async () => {
    await clearRecentRoutes();
    await refresh();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <Title style={styles.title}>Recent</Title>
      <Paragraph style={styles.subtitle}>
        Quickly jump back to calculators you used recently.
      </Paragraph>

      <Searchbar placeholder="Search calculators" value={query} onChangeText={setQuery} style={styles.search} />

      <View style={styles.actions}>
        <Button mode="outlined" icon="refresh" onPress={refresh}>
          Refresh
        </Button>
        <Button mode="outlined" icon="delete" onPress={doClear}>
          Clear
        </Button>
      </View>

      {!filtered.length ? (
        <Card style={styles.card}>
          <Card.Content>
            <Text>No recent calculators yet. Open any calculator and it will appear here.</Text>
          </Card.Content>
        </Card>
      ) : (
        filtered.map((entry, idx) => {
          const title = entry.title ?? friendlyTitleFromPath(entry.path);
          const pathLabel = entry.path.join(' > ');
          const when = new Date(entry.ts).toLocaleString();

          return (
            <Card key={`${entry.path.join('>')}-${idx}`} style={styles.card} onPress={() => handleOpen(entry)}>
              <Card.Content>
                <Title style={styles.cardTitle}>{title}</Title>
                <Paragraph>{pathLabel}</Paragraph>
                <Text style={styles.when}>{when}</Text>
              </Card.Content>
            </Card>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    width: '100%',
    maxWidth: 980,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    opacity: 0.8,
    marginBottom: 12,
  },
  search: {
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    borderRadius: 14,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
  },
  when: {
    marginTop: 6,
    opacity: 0.65,
    fontSize: 12,
  },
});
