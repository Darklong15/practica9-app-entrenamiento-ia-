import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, Text, Button, Input } from '../../components/ui';
import { useTheme } from '../../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'TimerScreen'>;

export default function TimerScreen({ route }: Props) {
  const theme = useTheme();
  
  // Si nos pasan una duración por navegación, la usamos por defecto
  const initialDuration = route.params?.duration || 0;
  
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isActive, setIsActive] = useState(initialDuration > 0);
  const [customTime, setCustomTime] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft > 0) {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialDuration || 0); // Vuelve al inicial o 0
  };

  const setTimer = (seconds: number) => {
    setIsActive(false);
    setTimeLeft(seconds);
    setIsActive(true);
  };

  const setCustom = () => {
    const time = parseInt(customTime, 10);
    if (!isNaN(time) && time > 0) {
      setTimer(time);
      setCustomTime('');
    }
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.container}>
        <Text variant="h1" style={styles.title}>Temporizador</Text>
        
        <Text 
          variant="stat" 
          style={styles.timeDisplay} 
          color={timeLeft > 0 ? theme.colors.primary : theme.colors.textPrimary}
        >
          {formatTime(timeLeft)}
        </Text>

        <View style={styles.quickButtonsRow}>
          <Button variant="secondary" onPress={() => setTimer(60)}>60s</Button>
          <Button variant="secondary" onPress={() => setTimer(90)}>90s</Button>
          <Button variant="secondary" onPress={() => setTimer(120)}>120s</Button>
        </View>

        <View style={styles.customRow}>
          <Input
            placeholder="Segundos (ej. 45)"
            value={customTime}
            onChangeText={setCustomTime}
            keyboardType="numeric"
            containerStyle={styles.customInput}
          />
          <Button variant="secondary" onPress={setCustom} disabled={!customTime.trim()}>
            Fijar
          </Button>
        </View>

        <View style={styles.controlsRow}>
          <Button 
            variant="primary" 
            onPress={toggleTimer} 
            disabled={timeLeft === 0}
            style={styles.controlBtn}
          >
            {isActive ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button 
            variant="danger" 
            onPress={resetTimer}
            style={styles.controlBtn}
          >
            Reiniciar
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 48,
  },
  title: {
    marginBottom: 48,
  },
  timeDisplay: {
    marginBottom: 64,
  },
  quickButtonsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
    justifyContent: 'center',
    width: '100%',
  },
  customRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 64,
    width: '100%',
  },
  customInput: {
    flex: 1,
    marginBottom: 0,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
  },
  controlBtn: {
    flex: 1,
    maxWidth: 150,
  }
});
