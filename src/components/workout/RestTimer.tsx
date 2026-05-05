import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Input, Card } from '../ui';
import { useTheme } from '../../theme';

export default function RestTimer() {
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // Opcionalmente: reproducir sonido o vibrar cuando acabe
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
    setTimeLeft(0);
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
    <Card style={styles.container}>
      <Text variant="h3" style={styles.title}>Temporizador de Descanso</Text>
      
      <Text 
        variant="h1" 
        style={styles.timeDisplay} 
        color={timeLeft > 0 ? theme.colors.primary : theme.colors.textPrimary}
      >
        {formatTime(timeLeft)}
      </Text>

      <View style={styles.quickButtonsRow}>
        <Button variant="secondary" size="sm" onPress={() => setTimer(60)}>60s</Button>
        <Button variant="secondary" size="sm" onPress={() => setTimer(90)}>90s</Button>
        <Button variant="secondary" size="sm" onPress={() => setTimer(120)}>120s</Button>
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
          variant="ghost" 
          onPress={resetTimer}
          style={styles.controlBtn}
        >
          Reiniciar
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
  },
  timeDisplay: {
    fontSize: 48,
    marginBottom: 24,
  },
  quickButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  customRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    paddingHorizontal: 8,
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
    minWidth: 100,
  }
});
