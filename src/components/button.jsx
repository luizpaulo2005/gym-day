import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

export const Button = ({
  title,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      flex: 1,
    }

    const sizeStyles = {
      default: { height: 40, maxHeight: 40, paddingHorizontal: 16 },
      sm: { height: 36, maxHeight: 36, paddingHorizontal: 12 },
      lg: { height: 44, maxHeight: 44, paddingHorizontal: 20 },
      icon: { height: 40, maxHeight: 40, width: 40, paddingHorizontal: 0 },
    }

    const variantStyles = {
      default: {
        backgroundColor: '#09090b',
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: '#f1f5f9',
        borderWidth: 0,
      },
      destructive: {
        backgroundColor: '#ef4444',
        borderWidth: 0,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#e2e8f0',
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
      link: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
    }

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.5 : 1,
    }
  }

  const getTextStyle = () => {
    const baseTextStyle = {
      fontWeight: '500',
      fontSize: 14,
    }

    // Estilos de texto por tamanho
    const sizeTextStyles = {
      default: { fontSize: 14 },
      sm: { fontSize: 13 },
      lg: { fontSize: 16 },
      icon: { fontSize: 14 },
    }

    // Estilos de texto por variante
    const variantTextStyles = {
      default: { color: '#fafafa' },
      secondary: { color: '#0f172a' },
      destructive: { color: '#fafafa' },
      outline: { color: '#0f172a' },
      ghost: { color: '#0f172a' },
      link: { color: '#0f172a', textDecorationLine: 'underline' },
    }

    return {
      ...baseTextStyle,
      ...sizeTextStyles[size],
      ...variantTextStyles[variant],
    }
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle()]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={
            variant === 'default' || variant === 'destructive'
              ? '#fafafa'
              : '#0f172a'
          }
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[getTextStyle()]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button
