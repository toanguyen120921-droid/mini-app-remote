import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './Card.styles';

export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  badge?: string;
  showTimestamp?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  badge = 'Remote Module',
  showTimestamp = true,
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.icon}>💳</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Description */}
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}

      {/* Image */}
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
        {showTimestamp && (
          <Text style={styles.timestamp}>
            {new Date().toLocaleTimeString()}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Card;
