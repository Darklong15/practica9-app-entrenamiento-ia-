import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Modal, ScrollView, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ScreenContainer, Text, Card, Badge, Divider, Button, Input } from '../../components/ui';
import { useTheme } from '../../theme';

interface WeightEntry {
  id: string;
  date: string;
  weight: number;
}

interface BodyMeasurements {
  pecho: string;
  cintura: string;
  biceps: string;
  muslo: string;
  cadera: string;
  antebrazo: string;
}

const DEFAULT_MEASUREMENTS: BodyMeasurements = {
  pecho: '0', cintura: '0', biceps: '0', muslo: '0', cadera: '0', antebrazo: '0'
};

export default function ProgressScreen() {
  const theme = useTheme();
  
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);
  const [measurements, setMeasurements] = useState<BodyMeasurements>(DEFAULT_MEASUREMENTS);
  
  const [isWeightModalVisible, setWeightModalVisible] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  
  const [isMeasureModalVisible, setMeasureModalVisible] = useState(false);
  const [tempMeasurements, setTempMeasurements] = useState<BodyMeasurements>(DEFAULT_MEASUREMENTS);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const loadData = async () => {
    try {
      const storedWeight = await AsyncStorage.getItem('weightHistory');
      if (storedWeight) setWeightHistory(JSON.parse(storedWeight));

      const storedMeasurements = await AsyncStorage.getItem('bodyMeasurements');
      if (storedMeasurements) setMeasurements(JSON.parse(storedMeasurements));
    } catch (error) {
      console.error('Error loading progress data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  const saveWeight = async () => {
    const weightVal = parseFloat(newWeight.replace(',', '.'));
    if (isNaN(weightVal) || weightVal <= 0) return;

    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      weight: weightVal
    };

    const newHistory = [newEntry, ...weightHistory];
    setWeightHistory(newHistory);
    await AsyncStorage.setItem('weightHistory', JSON.stringify(newHistory));
    setNewWeight('');
    setWeightModalVisible(false);
  };

  const saveMeasurements = async () => {
    setMeasurements(tempMeasurements);
    await AsyncStorage.setItem('bodyMeasurements', JSON.stringify(tempMeasurements));
    setMeasureModalVisible(false);
  };

  const currentWeight = weightHistory.length > 0 ? weightHistory[0].weight : 0;
  
  const renderWeightHistory = () => {
    if (weightHistory.length === 0) {
      return <Text variant="body" color={theme.colors.textSecondary}>No hay registros de peso aún.</Text>;
    }

    return weightHistory.slice(0, 5).map((entry, index) => {
      const previousWeight = index < weightHistory.length - 1 ? weightHistory[index + 1].weight : entry.weight;
      const diff = entry.weight - previousWeight;
      const diffFormatted = Math.abs(diff).toFixed(1);
      
      let badgeLabel = `~ 0.0 kg`;
      let badgeVariant: 'default' | 'success' | 'danger' = 'default';
      
      if (diff > 0) {
        badgeLabel = `↑ ${diffFormatted} kg`;
        badgeVariant = 'danger'; // Subir peso puede ser malo (o bueno, pero asumo default rojo)
      } else if (diff < 0) {
        badgeLabel = `↓ ${diffFormatted} kg`;
        badgeVariant = 'success';
      }

      return (
        <View key={entry.id}>
          <View style={styles.historyRow}>
            <Text variant="caption" color={theme.colors.textSecondary} style={{ width: 60 }}>{entry.date}</Text>
            <Text variant="body" style={{ flex: 1 }}>{entry.weight} kg</Text>
            {diff !== 0 && <Badge variant={badgeVariant} label={badgeLabel} />}
          </View>
          {index < Math.min(weightHistory.length, 5) - 1 && <Divider spacing="sm" />}
        </View>
      );
    });
  };

  return (
    <ScreenContainer scrollable={true} padding="md">
      <Animated.View style={{ opacity: fadeAnim, gap: theme.spacing.xl, paddingVertical: theme.spacing.md, paddingBottom: theme.spacing.xxl }}>
        
        {/* HEADER */}
        <View>
          <Text variant="h1">Mi Progreso</Text>
          <Text variant="body" color={theme.colors.textSecondary} style={{ marginTop: theme.spacing.xs }}>
            Registra tu evolución física
          </Text>
        </View>

        {/* CARD PESO CORPORAL */}
        <View style={{ gap: theme.spacing.md }}>
          <Card padding="lg">
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View>
                <Text variant="h3" style={{ marginBottom: theme.spacing.sm }}>Peso Actual</Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: theme.spacing.lg }}>
                  <Text variant="displayLg" style={{ lineHeight: 48 }}>{currentWeight > 0 ? currentWeight.toFixed(1) : '--'}</Text>
                  <Text variant="label" color={theme.colors.textMuted} style={{ marginBottom: 6, marginLeft: 6 }}>KG</Text>
                </View>
              </View>
              <Button size="sm" variant="secondary" onPress={() => setWeightModalVisible(true)}>
                + Peso
              </Button>
            </View>

            <View>
              {renderWeightHistory()}
            </View>
          </Card>
        </View>

        {/* CARD MEDIDAS */}
        <View style={{ gap: theme.spacing.md }}>
          <Card padding="md">
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.md }}>
              <Text variant="h3">Medidas</Text>
              <Button size="sm" variant="secondary" onPress={() => {
                setTempMeasurements(measurements);
                setMeasureModalVisible(true);
              }}>
                Editar
              </Button>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
              {[
                { label: 'Pecho', stat: measurements.pecho },
                { label: 'Cintura', stat: measurements.cintura },
                { label: 'Bíceps', stat: measurements.biceps },
                { label: 'Muslo', stat: measurements.muslo },
                { label: 'Cadera', stat: measurements.cadera },
                { label: 'Antebrazo', stat: measurements.antebrazo },
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
                  <Text variant="stat" style={{ fontSize: 24, lineHeight: 28 }}>{item.stat || '0'} cm</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* CARD OBJETIVOS */}
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
                  <View style={{ width: `${currentWeight > 0 ? Math.min(100, (75 / currentWeight) * 100) : 0}%`, height: '100%', backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.full }} />
                </View>
              </View>

              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                  <Text variant="body">Frecuencia Semanal</Text>
                  <Text variant="caption" color={theme.colors.textMuted}>Meta: 4 Días</Text>
                </View>
                <View style={{ width: '100%', height: 6, backgroundColor: theme.colors.primaryMuted, borderRadius: theme.borderRadius.full, overflow: 'hidden' }}>
                  <View style={{ width: '75%', height: '100%', backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.full }} />
                </View>
              </View>
            </View>
          </Card>
        </View>

      </Animated.View>

      {/* MODAL DE PESO */}
      <Modal visible={isWeightModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <Text variant="h2" style={{ marginBottom: 16 }}>Registrar Peso</Text>
            <Input
              placeholder="Ej. 78.5"
              value={newWeight}
              onChangeText={setNewWeight}
              keyboardType="numeric"
              containerStyle={{ marginBottom: 24 }}
            />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button variant="secondary" onPress={() => setWeightModalVisible(false)} style={{ flex: 1 }}>Cancelar</Button>
              <Button variant="primary" onPress={saveWeight} style={{ flex: 1 }}>Guardar</Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL DE MEDIDAS */}
      <Modal visible={isMeasureModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background, maxHeight: '80%' }]}>
            <Text variant="h2" style={{ marginBottom: 16 }}>Actualizar Medidas (cm)</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {(Object.keys(DEFAULT_MEASUREMENTS) as Array<keyof BodyMeasurements>).map((key) => (
                <View key={key} style={{ marginBottom: 12 }}>
                  <Text variant="label" style={{ marginBottom: 4 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                  <Input
                    placeholder="0"
                    value={tempMeasurements[key]}
                    onChangeText={(val) => setTempMeasurements(prev => ({ ...prev, [key]: val }))}
                    keyboardType="numeric"
                    containerStyle={{ marginBottom: 0 }}
                  />
                </View>
              ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
              <Button variant="secondary" onPress={() => setMeasureModalVisible(false)} style={{ flex: 1 }}>Cancelar</Button>
              <Button variant="primary" onPress={saveMeasurements} style={{ flex: 1 }}>Guardar</Button>
            </View>
          </View>
        </View>
      </Modal>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  }
});
