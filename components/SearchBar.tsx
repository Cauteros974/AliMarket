import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar({
    value: string,
    onChangeText: (value: string) => void;
    placeholder?: string;
})