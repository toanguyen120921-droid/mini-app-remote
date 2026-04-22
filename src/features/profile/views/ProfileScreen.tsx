import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {PROFILE_COPY, PROFILE_THEME} from "../models/profile.model";
import {ProfileScreenProps} from "../models/profile.types";
import {useProfileViewModel} from "../viewmodels/useProfileViewModel";
import {useWatchlistStore} from "../../watchlist/store/watchlistStore";
import {styles} from "./ProfileScreen.styles";

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

  const watchlistCount = useWatchlistStore((s) => s.movies.length);

  const displayName = account?.name || account?.username || "TMDB User";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={PROFILE_THEME.background}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ─── Header ─────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Tài khoản</Text>
          <Text style={styles.title}>{PROFILE_COPY.title}</Text>
          <Text style={styles.subtitle}>{PROFILE_COPY.subtitle}</Text>
        </View>

        {/* ─── Profile Card ───────────────────────────────────────────── */}
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
                {account.iso_3166_1 && (
                  <View style={styles.metaPill}>
                    <Text style={styles.metaText}>{account.iso_3166_1}</Text>
                  </View>
                )}
                {account.iso_639_1 && (
                  <View style={styles.metaPill}>
                    <Text style={styles.metaText}>{account.iso_639_1}</Text>
                  </View>
                )}
              </View>
            </>
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyEmoji}>👤</Text>
              <Text style={styles.emptyTitle}>{PROFILE_COPY.emptyTitle}</Text>
              <Text style={styles.emptyText}>{PROFILE_COPY.emptyMessage}</Text>
            </View>
          )}
        </View>

        {/* ─── Stats ──────────────────────────────────────────────────── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📋</Text>
            <Text style={styles.statValue}>{watchlistCount}</Text>
            <Text style={styles.statLabel}>Watchlist</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🎬</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Đã xem</Text>
          </View>
        </View>

        {/* ─── Error ──────────────────────────────────────────────────── */}
        {errorMessage ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* ─── Load / Retry Button ────────────────────────────────────── */}
        <TouchableOpacity
          activeOpacity={0.85}
          disabled={isLoading}
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={loadAccountDetail}
        >
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

        {/* ─── Settings Menu ──────────────────────────────────────────── */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Cài đặt</Text>
          <View style={styles.menuCard}>
            <MenuItem emoji="🌙" label="Giao diện tối" value="Bật" showBorder />
            <MenuItem
              emoji="🌐"
              label="Ngôn ngữ"
              value="Tiếng Việt"
              showBorder
            />
            <MenuItem emoji="🔔" label="Thông báo" value="Bật" showBorder />
            <MenuItem
              emoji="📱"
              label="Chất lượng video"
              value="Tự động"
              showBorder
            />
            <MenuItem emoji="ℹ️" label="Về ứng dụng" />
          </View>
        </View>

        {/* ─── App Info ───────────────────────────────────────────────── */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Movies App</Text>
          <Text style={styles.appInfoVersion}>Version 0.0.1 • Build 1</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Menu Item Component ───────────────────────────────────────────────────────

interface MenuItemProps {
  emoji: string;
  label: string;
  value?: string;
  showBorder?: boolean;
}

function MenuItem({emoji, label, value, showBorder}: MenuItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.menuItem, showBorder && styles.menuItemBorder]}
    >
      <Text style={styles.menuItemEmoji}>{emoji}</Text>
      <Text style={styles.menuItemText}>{label}</Text>
      {value && <Text style={styles.menuItemValueText}>{value}</Text>}
      <Text style={styles.menuItemChevron}>›</Text>
    </TouchableOpacity>
  );
}
