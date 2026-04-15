import React from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PROFILE_COPY, PROFILE_THEME} from '../models/profile.model';
import {ProfileScreenProps} from '../models/profile.types';
import {useProfileViewModel} from '../viewmodels/useProfileViewModel';
import {styles} from './ProfileScreen.styles';

export default function ProfileScreen(
  props: ProfileScreenProps,
): React.ReactElement {
  const {
    account,
    accountId,
    avatarUrl,
    errorMessage,
    isLoading,
    loadAccountDetail,
  } = useProfileViewModel(props);

  const displayName = account?.name || account?.username || 'TMDB User';
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={PROFILE_THEME.background}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>TMDB Account</Text>
          <Text style={styles.title}>{PROFILE_COPY.title}</Text>
          <Text style={styles.subtitle}>{PROFILE_COPY.subtitle}</Text>
        </View>

        <View style={styles.card}>
          {account ? (
            <>
              <View style={styles.profileRow}>
                {avatarUrl ? (
                  <Image source={{uri: avatarUrl}} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarFallbackText}>
                      {avatarInitial}
                    </Text>
                  </View>
                )}

                <View style={styles.profileInfo}>
                  <Text style={styles.name}>{displayName}</Text>
                  <Text style={styles.username}>@{account.username}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaPill}>
                  <Text style={styles.metaText}>ID {account.id}</Text>
                </View>
                <View style={styles.metaPill}>
                  <Text style={styles.metaText}>{account.iso_3166_1}</Text>
                </View>
                <View style={styles.metaPill}>
                  <Text style={styles.metaText}>{account.iso_639_1}</Text>
                </View>
                <View style={styles.metaPill}>
                  <Text style={styles.metaText}>
                    Adult {account.include_adult ? 'On' : 'Off'}
                  </Text>
                </View>
              </View>

              <View style={styles.rawBox}>
                <Text style={styles.rawTitle}>Raw response</Text>
                <Text style={styles.rawText}>
                  {JSON.stringify(account, null, 2)}
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>{PROFILE_COPY.emptyTitle}</Text>
              <Text style={styles.emptyText}>
                Account ID: {accountId}
                {'\n'}
                {PROFILE_COPY.emptyMessage}
              </Text>
            </View>
          )}

          {errorMessage ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={isLoading}
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={loadAccountDetail}>
            {isLoading ? (
              <ActivityIndicator color={PROFILE_THEME.text} />
            ) : (
              <Text style={styles.buttonText}>
                {account
                  ? PROFILE_COPY.retryButtonLabel
                  : PROFILE_COPY.loadButtonLabel}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
