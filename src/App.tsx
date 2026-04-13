import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useRemoteAppViewModel} from './features/remote/viewmodels/useRemoteAppViewModel';

interface RemoteAppProps {
  onLoadComplete?: () => void;
  onRequestUpdate?: () => void;
}

function App({onLoadComplete, onRequestUpdate}: RemoteAppProps): React.ReactElement {
  const {
    isDarkMode,
    content,
    capabilities,
    handleOpenRemoteAction,
    handleRequestUpdate,
  } = useRemoteAppViewModel({
    onLoadComplete,
    onRequestUpdate,
  });

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{content.title}</Text>
            <Text style={styles.headerSub}>{content.subtitle}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{content.sectionTitle}</Text>
            {capabilities.map(capability => (
              <Text key={capability.id} style={styles.cardText}>
                {capability.title}
              </Text>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleOpenRemoteAction}>
            <Text style={styles.buttonText}>{content.buttonLabel}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={handleRequestUpdate}>
            <Text style={styles.buttonText}>{content.updateButtonLabel}</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{content.howItWorksTitle}</Text>
            <Text style={styles.cardText}>{content.howItWorksDescription}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8f9fa'},
  containerDark: {backgroundColor: '#1a1a2e'},
  content: {padding: 16},
  header: {
    backgroundColor: '#e91e63',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  headerTitle: {fontSize: 28, fontWeight: '700', color: '#fff'},
  headerSub: {fontSize: 15, color: 'rgba(255,255,255,0.8)', marginTop: 4},
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {fontSize: 17, fontWeight: '600', color: '#212529', marginBottom: 8},
  cardText: {fontSize: 14, color: '#495057', lineHeight: 22},
  button: {
    backgroundColor: '#e91e63',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  updateButton: {
    backgroundColor: '#4361ee',
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: '600'},
});

export default App;
