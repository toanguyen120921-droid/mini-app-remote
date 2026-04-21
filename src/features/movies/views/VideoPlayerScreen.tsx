import React, {useState, useCallback, useRef, useEffect} from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import {useRoute, useNavigation, RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useVideoPlayer, VideoView, useEvent} from "react-native-video";
import {RootStackParamList} from "../../../navigation/types";

const {width: W} = Dimensions.get("window");
const SEEK_SECONDS = 10;

// ⚠️ YouTube URLs (youtu.be / youtube.com) KHÔNG hoạt động với react-native-video.
// Phải dùng URL trực tiếp đến file video (.mp4, .m3u8, v.v.)
const VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4";

type VideoPlayerRouteProp = RouteProp<RootStackParamList, "VideoPlayer">;
type VideoPlayerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VideoPlayer"
>;

export default function VideoPlayerScreen() {
  const route = useRoute<VideoPlayerRouteProp>();
  const navigation = useNavigation<VideoPlayerNavigationProp>();
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (showControls && isPlaying) {
      hideTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [showControls, isPlaying]);

  const player = useVideoPlayer(VIDEO_URL, (_player) => {
    _player.loop = false;
    _player.play();
  });

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Track progress via onProgress event
  useEvent(
    player,
    "onProgress",
    useCallback((data) => {
      setCurrentTime(data.currentTime);
    }, []),
  );

  // Get duration when video loads
  useEvent(
    player,
    "onLoad",
    useCallback(
      (data: {
        currentTime: number;
        duration: number;
        height: number;
        width: number;
        orientation: string;
      }) => {
        setDuration(data.duration);
      },
      [],
    ),
  );

  // tua lại 10s
  const seekBackward = useCallback(() => {
    player.seekBy(-3);
  }, [player]);

  // tua tới 10s
  const seekForward = useCallback(() => {
    player.seekBy(SEEK_SECONDS);
  }, [player]);

  // phát lại từ đầu
  const replay = useCallback(() => {
    player.seekBy(0);
    player.play();
    setIsPlaying(true);
  }, [player]);

  // play / pause toggle
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  }, [player, isPlaying]);

  // Format seconds → mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorText}>Không thể phát video</Text>
        <Text style={styles.errorDetail}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => setError(null)}
        >
          <Text style={styles.retryText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Video — pointerEvents="none" so touches pass through to controls overlay */}
      <View style={styles.video} pointerEvents="none">
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          controls={false}
          resizeMode="contain"
        />
      </View>

      {/* Custom Controls Overlay — sits above the video */}
      <TouchableOpacity
        activeOpacity={1}
        style={styles.controlsOverlay}
        onPress={() => setShowControls(!showControls)}
      >
        {showControls && (
          <View style={styles.controlsContainer}>
            {/* Top bar: back button */}
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Text style={styles.backText}>← Quay lại</Text>
              </TouchableOpacity>
            </View>

            {/* Center controls: seek back, play/pause, seek forward */}
            <View style={styles.centerControls}>
              <TouchableOpacity
                onPress={seekBackward}
                style={styles.controlBtn}
              >
                <Text style={styles.controlIcon}>⏪</Text>
                <Text style={styles.controlLabel}>10s</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={togglePlayPause}
                style={styles.playPauseBtn}
              >
                <Text style={styles.playPauseIcon}>
                  {isPlaying ? "⏸" : "▶️"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={seekForward} style={styles.controlBtn}>
                <Text style={styles.controlIcon}>⏩</Text>
                <Text style={styles.controlLabel}>10s</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom bar: progress + replay */}
            <View style={styles.bottomBar}>
              {/* Progress bar */}
              <View style={styles.progressRow}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <View style={styles.progressBarBg}>
                  <View
                    style={[styles.progressBarFill, {width: `${progress}%`}]}
                  />
                </View>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>

              {/* Replay button */}
              <TouchableOpacity onPress={replay} style={styles.replayBtn}>
                <Text style={styles.replayIcon}>🔄</Text>
                <Text style={styles.replayText}>Xem lại từ đầu</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "space-between",
  },
  controlsContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  // Top bar
  topBar: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  backText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },

  // Center controls
  centerControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  controlBtn: {
    alignItems: "center",
  },
  controlIcon: {
    fontSize: 32,
  },
  controlLabel: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  playPauseBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(230, 59, 69, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseIcon: {
    fontSize: 32,
  },

  // Bottom bar
  bottomBar: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  timeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "500",
    minWidth: 40,
    textAlign: "center",
  },
  progressBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#E63B45",
    borderRadius: 2,
  },
  replayBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 10,
    borderRadius: 8,
  },
  replayIcon: {
    fontSize: 18,
  },
  replayText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },

  // Error screen
  errorContainer: {
    flex: 1,
    backgroundColor: "#090D14",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  errorDetail: {
    color: "#94A3B8",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#E63B45",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
