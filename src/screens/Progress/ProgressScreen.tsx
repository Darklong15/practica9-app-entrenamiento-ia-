import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, Text, Card, Badge, Divider, Button } from '../../components/ui';
import { useTheme } from '../../theme';

export default function ProgressScreen() {
  const theme = useTheme();

  return (
    <ScreenContainer scrollable={true} padding="md">
      <View style={{ gap: theme.spacing.xl, paddingVertical: theme.spacing.md, paddingBottom: theme.spacing.xxl }}>
        
        {/* 1. HEADER */}
        <View>
          <Text variant="h1">Mi Progreso</Text>
          <Text variant="body" color={theme.colors.textSecondary} style={{ marginTop: theme.spacing.xs }}>
            Registra tu evolución física
          </Text>
        </View>

        {/* 2. CARD "Peso Corporal" */}
        <View style={{ gap: theme.spacing.md }}>
          <Card padding="lg">
            <Text variant="h3" style={{ marginBottom: theme.spacing.sm }}>Peso Actual</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: theme.spacing.lg }}>
              <Text variant="displayLg" style={{ lineHeight: 48 }}>78.5</Text>
              <Text variant="label" color={theme.colors.textMuted} style={{ marginBottom: 6, marginLeft: 6 }}>KG</Text>
            </View>

            <View>
              <View style={styles.historyRow}>
                <Text variant="caption" color={theme.colors.textSecondary} style={{ width: 60 }}>01 May</Text>
                <Text variant="body" style={{ flex: 1 }}>78.5 kg</Text>
                <Badge variant="success" label="↓ 0.5 kg" />
              </View>
              <Divider spacing="sm" />
              
              <View style={styles.historyRow}>
                <Text variant="caption" color={theme.colors.textSecondary} style={{ width: 60 }}>28 Abr</Text>
                <Text variant="body" style={{ flex: 1 }}>79.0 kg</Text>
                <Badge variant="success" label="↓ 0.2 kg" />
              </View>
              <Divider spacing="sm" />

              <View style={styles.historyRow}>
                <Text variant="caption" color={theme.colors.textSecondary} style={{ width: 60 }}>25 Abr</Text>
                <Text variant="body" style={{ flex: 1 }}>79.2 kg</Text>
                <Badge variant="success" label="↓ 0.6 kg" />
              </View>
              <Divider spacing="sm" />

              <View style={styles.historyRow}>
                <Text variant="caption" color={theme.colors.textSecondary} style={{ width: 60 }}>22 Abr</Text>
                <Text variant="body" style={{ flex: 1 }}>79.8 kg</Text>
                <Badge variant="success" label="↓ 0.3 kg" />
              </View>
              <Divider spacing="sm" />

              <View style={styles.historyRow}>
                <Text variant="caption" color={theme.colors.textSecondary} style={{ width: 60 }}>19 Abr</Text>
                <Text variant="body" style={{ flex: 1 }}>80.1 kg</Text>
                <Badge variant="danger" label="↑ 0.4 kg" />
              </View>
            </View>
          </Card>
        </View>

        {/* 3. CARD "Medidas Corporales" */}
        <View style={{ gap: theme.spacing.md }}>
          <Card padding="md">
            <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>Medidas</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
              {[
                { label: 'Pecho', stat: '102 cm' },
                { label: 'Cintura', stat: '82 cm' },
                { label: 'Bíceps', stat: '38 cm' },
                { label: 'Muslo', stat: '58 cm' },
                { label: 'Cadera', stat: '96 cm' },
                { label: 'Antebrazo', stat: '30 cm' },
              ].map((item, index) => (
                <View 
                  key={index} 
                  style={{ 
                    width: '48%', 
                    backgroundColor: theme.colors.surfaceElevated, 
                    borderRadius: theme.borderRadius.sm, 
                    padding: theme.spacing.sm 
                  }}
                >
                  <Text variant="label" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.xs }}>{item.label}</Text>
                  <Text variant="stat" style={{ fontSize: 24, lineHeight: 28 }}>{item.stat}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* 4. CARD "Objetivos" */}
        <View style={{ gap: theme.spacing.md }}>
          <Card padding="md">
            <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>Mis Objetivos</Text>
            
            <View style={{ gap: theme.spacing.md }}>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                  <Text variant="body">Peso Corporal</Text>
                  <Text variant="caption" color={theme.colors.textMuted}>Meta: 75 kg</Text>
                </View>
                <View style={{ width: '100%', height: 6, backgroundColor: theme.colors.primaryMuted, borderRadius: theme.borderRadius.full, overflow: 'hidden' }}>
                  <View style={{ width: '60%', height: '100%', backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.full }} />
                </View>
              </View>

              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                  <Text variant="body">Bench Press</Text>
                  <Text variant="caption" color={theme.colors.textMuted}>Meta: 100 kg</Text>
                </View>
                <View style={{ width: '100%', height: 6, backgroundColor: theme.colors.primaryMuted, borderRadius: theme.borderRadius.full, overflow: 'hidden' }}>
                  <View style={{ width: '80%', height: '100%', backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.full }} />
                </View>
              </View>

              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                  <Text variant="body">Sentadilla</Text>
                  <Text variant="caption" color={theme.colors.textMuted}>Meta: 140 kg</Text>
                </View>
                <View style={{ width: '100%', height: 6, backgroundColor: theme.colors.primaryMuted, borderRadius: theme.borderRadius.full, overflow: 'hidden' }}>
                  <View style={{ width: '45%', height: '100%', backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.full }} />
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* 5. BOTÓN */}
        <Button variant="primary" size="lg" onPress={() => {}}>
          Registrar Medida
        </Button>

      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  }
});
