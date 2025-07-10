import React, { useState, forwardRef } from 'react';
import {
  TextInput,
  View,
  Text,
} from 'react-native';

export const Input = forwardRef(({
  label,
  placeholder,
  value,
  onChangeText,
  disabled = false,
  multiline = false,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  inputStyle,
  labelStyle,
  variant = 'default',
  size = 'default',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = () => {
    return {
      marginBottom: 4,
    };
  };

  const getInputStyle = () => {
    const baseStyle = {
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: 12,
      fontSize: 14,
      backgroundColor: '#ffffff',
      color: '#0f172a',
    };

    const sizeStyles = {
      default: { 
        height: 40,
        paddingVertical: 8,
      },
      sm: { 
        height: 36,
        paddingVertical: 6,
        fontSize: 13,
      },
      lg: { 
        height: 44,
        paddingVertical: 10,
        fontSize: 16,
      },
    };

    const variantStyles = {
      default: {
        borderColor: isFocused ? '#0f172a' : '#e2e8f0',
      },
      outline: {
        borderColor: isFocused ? '#0f172a' : '#d1d5db',
        backgroundColor: 'transparent',
      },
    };

    let finalStyle = {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };

    if (disabled) {
      finalStyle = { 
        ...finalStyle, 
        backgroundColor: '#f8fafc',
        borderColor: '#e2e8f0',
        color: '#94a3b8',
      };
    }

    if (multiline) {
      finalStyle = { 
        ...finalStyle, 
        height: 80, 
        paddingTop: 8,
        textAlignVertical: 'top' 
      };
    }

    return finalStyle;
  };

  const getLabelStyle = () => {
    return {
      fontSize: 14,
      fontWeight: '500',
      color: '#374151',
      marginBottom: 6,
    };
  };

  return (
    <View style={[getContainerStyle(), style]}>
      {label && (
        <Text style={[getLabelStyle(), labelStyle]}>
          {label}
        </Text>
      )}
      
      <TextInput
        ref={ref}
        style={[getInputStyle(), inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
});

Input.displayName = 'Input';

export default Input;